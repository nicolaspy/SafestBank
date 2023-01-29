const express = require('express')

const PORT = process.env.PORT || 3001

const app = express()

const transactions = [{
  id: 1,
  personId: 1,
  amount: 100,
  type: 'credit',
  oldTotal: 0,
  newTotal: 100,
  createdAt: '2023-01-10T00:00:00652Z'
},
{
  id: 2,
  personId: 1,
  amount: 50,
  type: 'credit',
  oldTotal: 100,
  newTotal: 150,
  createdAt: '2023-01-11T00:00:00652Z'
},
{
  id: 3,
  personId: 1,
  amount: 100,
  type: 'debit',
  oldTotal: 150,
  newTotal: 50,
  createdAt: '2023-01-12T00:00:00652Z'

},
{
  id: 4,
  personId: 2,
  amount: 200,
  type: 'credit',
  oldTotal: 0,
  newTotal: 200,
  createdAt: '2023-01-13T00:00:00652Z'
}]

const cors = require('cors')
app.use(cors({
  origin: '*'
}))

app.get('/api/Transactions/:personId', (req, res) => {
  res.json(
    transactions.filter(
      (transaction) => { return transaction.personId === Number(req.params.personId) }
    )
  )
})

app.use(express.json())
app.post('/api/Transactions', (req, res) => {
  const transactionFiltered = transactions.filter(
    (transaction) => { return transaction.personId === Number(req.body.personId) })

  const getNewTotal = () => {
    switch (req.body.type) {
      case 'credit':
        if (transactionFiltered.length === 0) {
          return req.body.amount
        } else {
          return transactionFiltered[transactionFiltered.length - 1].newTotal +
                req.body.amount
        }
      case 'debit':
        if (transactionFiltered.length === 0) {
          return 0 - req.body.amount
        } else {
          return transactionFiltered[transactionFiltered.length - 1].newTotal -
                req.body.amount
        }
      default:
        return req.body.amount
    }
  }

  const newTransaction = {
    id: transactions.length + 1,
    oldTotal:
      transactionFiltered.length === 0
        ? 0
        : transactionFiltered[transactionFiltered.length - 1].newTotal,
    newTotal: getNewTotal(),
    ...req.body
  }

  transactions.push(newTransaction)
  transactionFiltered.push(newTransaction)

  res.json(transactionFiltered)
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

console.log(transactions)
