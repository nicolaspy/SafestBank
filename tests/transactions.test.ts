import request from "supertest";
import { AddTransaction, Type } from "../server/types";
import { getTransactionsById } from "../server/utils/common";
import createServer from "../server/utils/connect";
import transactionsData from "../server/services/transactionsData.json";
import { expect } from "@jest/globals";

const app = createServer();
const transactions = transactionsData.slice();
const transactionMock = transactionsData.slice();

describe("transactions", () => {
  describe("get transactions", () => {
    describe("given the person has no transactions", () => {
      it("should return a 200 status and a empty array", async () => {
        const personId = 5;
        const { body, statusCode } = await request(app).get(
          `/api/transactions/${personId}`
        );

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(getTransactionsById(personId));
        expect(body).toStrictEqual([]);
      });
    });

    describe("given the person has transactions", () => {
      it("should return a 200 status and an array with the transactions", async () => {
        const personId = 1;
        const { body, statusCode } = await request(app).get(
          `/api/transactions/${personId}`
        );

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(getTransactionsById(personId));
      });
    });
  });
  describe("credit transaction", () => {
    const newCreditTransaction = (personId: number): AddTransaction => {
      return {
        personId,
        amount: 200,
        type: Type.Credit,
      };
    };

    describe("given the transaction is type credit and the person has no transactions", () => {
      const personId = 444;

      it("should return a 200 status and the new transaction", async () => {
        const { body, statusCode } = await request(app)
          .post(`/api/transactions/`)
          .send(newCreditTransaction(personId));

        expect(statusCode).toBe(200);

        expect(body.amount).toBe(newCreditTransaction(personId).amount);
        expect(body.id).toBe(transactions.length + 1);
        expect(body.oldTotal).toBe(0);
        expect(body.newTotal).toBe(newCreditTransaction(personId).amount);
      });
    });

    describe("given the transaction is type credit and the person has transactions", () => {
      const personId = 1;

      it("should return a 200 status and an array with the transactions", async () => {
        const transactionFiltered = transactionMock.filter((transaction) => {
          return transaction.personId === personId;
        });

        const lastItem = transactionFiltered[transactionFiltered.length - 1];
        const { body, statusCode } = await request(app)
          .post(`/api/transactions/`)
          .send(newCreditTransaction(personId));

        expect(statusCode).toBe(200);
        expect(body.amount).toBe(newCreditTransaction(personId).amount);
        expect(body.oldTotal).toBe(lastItem.newTotal);
        expect(body.newTotal).toBe(
          lastItem.newTotal + newCreditTransaction(personId).amount
        );
      });
    });
  });
  describe("debit transaction", () => {
    const newCreditTransaction = (personId: number): AddTransaction => {
      return {
        personId,
        amount: 200,
        type: Type.Debit,
      };
    };

    describe("given the transaction is type debit and the person has no transactions", () => {
      const personId = 222;

      it("should return a 400 status", async () => {
        const { statusCode } = await request(app)
          .post(`/api/transactions/`)
          .send(newCreditTransaction(personId));

        expect(statusCode).toBe(400);
      });
    });

    describe("given the transaction is type debit and the person has transactions", () => {
      const personId = 1;

      it("should return a 200 status and an array with the transaction", async () => {
        const transactionFiltered = transactionsData.filter((transaction) => {
          return transaction.personId === personId;
        });

        const lastItem = transactionFiltered[transactionFiltered.length - 1];
        const { body, statusCode } = await request(app)
          .post(`/api/transactions/`)
          .send(newCreditTransaction(personId));

        expect(statusCode).toBe(200);
        expect(body.amount).toBe(newCreditTransaction(personId).amount);
        expect(body.oldTotal).toBe(lastItem.newTotal);
        expect(body.newTotal).toBe(
          lastItem.newTotal - newCreditTransaction(personId).amount
        );
      });
    });
  });
});
