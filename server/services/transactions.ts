import { AddTransaction, Transaction } from "../types";
import { getAddTransactionObject } from "../utils/common";
import transactionsData from "./transactionsData.json";

const transactions: Transaction[] =
  transactionsData as unknown as Transaction[];

export const addTransaction = (body: AddTransaction): Transaction => {
  const newTransaction = getAddTransactionObject(body, transactions);
  transactions.push(newTransaction);
  return newTransaction;
};
