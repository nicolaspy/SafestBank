import { Balance, Transaction } from "../types";
import transactionsData from "./transactionsData.json";

const transactions: Transaction[] =
  transactionsData as unknown as Transaction[];

export const getBalance = (personId: number): Balance => {
  const transactionFiltered = transactions.filter((transaction) => {
    return transaction.personId === personId;
  });

  const lastNewTotal =
    transactionFiltered[transactionFiltered.length - 1].newTotal;

  return { balance: lastNewTotal };
};
