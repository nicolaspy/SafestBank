import { Balance } from "../types";
import { getTransactionsById } from "../utils/common";

export const getBalance = (personId: number): Balance => {
  const transactionFiltered = getTransactionsById(personId);

  if (transactionFiltered.length === 0) {
    return {
      personId,
      balance: 0,
    };
  }

  const lastNewTotal =
    transactionFiltered[transactionFiltered.length - 1].newTotal;

  return { personId: personId, balance: lastNewTotal };
};
