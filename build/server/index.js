'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const cors_1 = __importDefault(require('cors'))
const transactions_1 = __importDefault(require('./routes/transactions'))
const PORT = process.env.PORT || 3001
const app = (0, express_1.default)()
const transactions = [
  {
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
  }
]
app.use((0, cors_1.default)({
  origin: '*'
}))
// app.get("/api/Transactions/:personId", (req, res) => {
//   res.json(
//     transactions.filter((transaction) => {
//       return transaction.personId === +req.params.personId;
//     })
//   );
// });
app.get('/api/Balance/:personId', (req, res) => {
  const transactionFiltered = transactions.filter((transaction) => {
    return transaction.personId === +req.params.personId
  })
  const lastNewTotal = transactionFiltered[transactionFiltered.length - 1].newTotal
  res.json({ balance: lastNewTotal })
})
// app.use(express.json());
// app.post("/api/Transactions", (req, res) => {
//   const transactionFiltered = transactions.filter((transaction) => {
//     return transaction.personId === +req.body.personId;
//   });
//   const getNewTotal = () => {
//     switch (req.body.type) {
//       case "credit":
//         if (transactionFiltered.length === 0) {
//           return req.body.amount;
//         } else {
//           return (
//             transactionFiltered[transactionFiltered.length - 1].newTotal +
//             req.body.amount
//           );
//         }
//       case "debit":
//         if (transactionFiltered.length === 0) {
//           return 0 - req.body.amount;
//         } else {
//           return (
//             transactionFiltered[transactionFiltered.length - 1].newTotal -
//             req.body.amount
//           );
//         }
//       default:
//         return req.body.amount;
//     }
//   };
//   const newTransaction = {
//     id: transactions.length + 1,
//     oldTotal:
//       transactionFiltered.length === 0
//         ? 0
//         : transactionFiltered[transactionFiltered.length - 1].newTotal,
//     newTotal: getNewTotal(),
//     ...req.body,
//   };
//   transactions.push(newTransaction);
//   transactionFiltered.push(newTransaction);
//   res.json(transactionFiltered);
// });
app.use('/api/transactions', transactions_1.default)
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
