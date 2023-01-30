import transactionsData from "../services/transactionsData.json";
import { AddTransaction, Transaction, Type } from "../types";

const transactions: Transaction[] =
  transactionsData as unknown as Transaction[];

export const getTransactionsById = (personId: number) =>
  transactions.filter((transaction) => {
    return transaction.personId === personId;
  });

export const getAddTransactionObject = (
  body: AddTransaction,
  transactions: Transaction[]
): Transaction => {
  const transactionFiltered = getTransactionsById(+body.personId);

  const lastItem = transactionFiltered[transactionFiltered.length - 1];

  if (body.type === Type.Debit && body.amount > lastItem.newTotal)
    throw new Error("Insufficient funds");

  const getNewTotal = () => {
    switch (body.type) {
      case Type.Credit:
        if (transactionFiltered.length === 0) {
          return body.amount;
        } else {
          return lastItem.newTotal + body.amount;
        }
      case Type.Debit:
        if (transactionFiltered.length === 0) {
          throw new Error("Insufficient funds");
        } else {
          return lastItem.newTotal - body.amount;
        }
      default:
        return body.amount;
    }
  };

  const newTransaction = {
    id: transactions.length + 1,
    oldTotal: transactionFiltered.length === 0 ? 0 : lastItem.newTotal,
    newTotal: getNewTotal(),
    createdAt: new Date(),
    ...body,
  };

  return newTransaction;
};
