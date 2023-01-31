export enum Type {
  Debit = "debit",
  Credit = "credit",
}

export interface Transaction {
  id: number;
  personId: number | string;
  amount: number;
  type: Type;
  oldTotal: number;
  newTotal: number;
  createdAt: Date;
}

export type AddTransaction = Pick<Transaction, "amount" | "type" | "personId">;

export interface Balance {
  personId: number;
  balance: number;
}

export type TransactionFormType = {
  amount: number;
};
