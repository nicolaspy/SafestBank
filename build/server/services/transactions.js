'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.addTransaction = exports.getBalance = exports.getTransactions = void 0
const transactionsData_json_1 = __importDefault(require('./transactionsData.json'))
const transactions = transactionsData_json_1.default
const getTransactions = (id) => {
  return transactions.filter((transaction) => {
    return transaction.personId === id
  })
}
exports.getTransactions = getTransactions
const getBalance = () => transactions
exports.getBalance = getBalance
const addTransaction = (body) => {
  const transactionFiltered = transactions.filter((transaction) => {
    return transaction.personId === +body.personId
  })
  const getNewTotal = () => {
    switch (body.type) {
      case 'credit':
        if (transactionFiltered.length === 0) {
          return body.amount
        } else {
          return (transactionFiltered[transactionFiltered.length - 1].newTotal +
                        body.amount)
        }
      case 'debit':
        if (transactionFiltered.length === 0) {
          return 0 - body.amount
        } else {
          return (transactionFiltered[transactionFiltered.length - 1].newTotal -
                        body.amount)
        }
      default:
        return body.amount
    }
  }
  const newTransaction = {
    id: transactions.length + 1,
    oldTotal: transactionFiltered.length === 0
      ? 0
      : transactionFiltered[transactionFiltered.length - 1].newTotal,
    newTotal: getNewTotal(),
    createdAt: new Date(),
    ...body
  }
  transactions.push(newTransaction)
  transactionFiltered.push(newTransaction)
  return newTransaction
}
exports.addTransaction = addTransaction
