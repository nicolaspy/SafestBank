'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const types_1 = require('../types')
const parsePersonId = (id) => {
  console.log(isNumber(id))
  if (!isString(id) && !isNumber(id)) {
    throw new Error('Person ID must be a string')
  }
  return id
}
const parseAmount = (amount) => {
  if (!isNumber(amount)) {
    throw new Error('Transaction amount must be a number')
  }
  return amount
}
const parseType = (type) => {
  if (!isString(type) || !isType(type)) {
    throw new Error('Incorrect transaction type')
  }
  return type
}
const isString = (value) => {
  return typeof value === 'string' || value instanceof String
}
const isNumber = (value) => {
  return typeof value === 'number' || value instanceof Number
}
const isType = (value) => {
  return Object.values(types_1.Type).includes(value)
}
const toNewTransaction = (object) => {
  const newTransaction = {
    personId: parsePersonId(object.personId),
    amount: parseAmount(object.amount),
    type: parseType(object.type)
  }
  return newTransaction
}
exports.default = toNewTransaction
