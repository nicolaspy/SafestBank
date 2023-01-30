import { AddTransaction, Transaction, Type } from "../types";
import transactionsData from "./transactionsData.json";

const transactions: Transaction[] =
  transactionsData as unknown as Transaction[];

export const getTransactions = (id: number): Transaction[] => {
  return transactions.filter((transaction) => {
    return transaction.personId === id;
  });
};

export const getBalance = (): Transaction[] => transactions;

export const addTransaction = (body: AddTransaction): Transaction => {
  const transactionFiltered = transactions.filter((transaction) => {
    return transaction.personId === +body.personId;
  });

  const getNewTotal = () => {
    switch (body.type) {
      case Type.Credit:
        if (transactionFiltered.length === 0) {
          return body.amount;
        } else {
          return (
            transactionFiltered[transactionFiltered.length - 1].newTotal +
            body.amount
          );
        }
      case Type.Debit:
        if (transactionFiltered.length === 0) {
          return 0 - body.amount;
        } else {
          return (
            transactionFiltered[transactionFiltered.length - 1].newTotal -
            body.amount
          );
        }
      default:
        return body.amount;
    }
  };

  const newTransaction = {
    id: transactions.length + 1,
    oldTotal:
      transactionFiltered.length === 0
        ? 0
        : transactionFiltered[transactionFiltered.length - 1].newTotal,
    newTotal: getNewTotal(),
    createdAt: new Date(),
    ...body,
  };

  transactions.push(newTransaction);
  transactionFiltered.push(newTransaction);
  return newTransaction;
};
