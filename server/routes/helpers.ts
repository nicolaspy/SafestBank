import { AddTransaction, Type } from "../types";

const parsePersonId = (id: any): number => {
  if (!isNumber(id)) {
    throw new Error("Person ID must be a string");
  }
  return id;
};

const parseAmount = (amount: any): number => {
  if (!isNumber(amount)) {
    throw new Error("Transaction amount must be a number");
  }
  return amount;
};

const parseType = (type: any): Type => {
  if (!isString(type) || !isType(type)) {
    throw new Error("Incorrect transaction type");
  }
  return type;
};

const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};
const isNumber = (value: any): boolean => {
  return typeof value === "number" || value instanceof Number;
};

const isType = (value: any): boolean => {
  return Object.values(Type).includes(value);
};

const toNewTransaction = (object: any): AddTransaction => {
  const newTransaction: AddTransaction = {
    personId: parsePersonId(object.personId),
    amount: parseAmount(object.amount),
    type: parseType(object.type),
  };
  return newTransaction;
};

export default toNewTransaction;
