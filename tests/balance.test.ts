import request from "supertest";
import { getBalance } from "../server/services/balance";
import { AddTransaction, Balance, Type } from "../server/types";
import createServer from "../server/utils/connect";
import { expect } from "@jest/globals";

const app = createServer();

describe("balance", () => {
  describe("get balance", () => {
    const noBalanceResponse = (personId: number): Balance => {
      return {
        personId,
        balance: 0,
      };
    };
    describe("given the person has no balance", () => {
      it("should return a 200 status and a balance of 0", async () => {
        const personId = 5;

        const { body, statusCode } = await request(app).get(
          `/api/balance/${personId}`
        );

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(noBalanceResponse(personId));
      });
    });

    describe("given the person has balance", () => {
      it("should return a 200 status and the correct balance", async () => {
        const personId = 1;
        const { body, statusCode } = await request(app).get(
          `/api/balance/${personId}`
        );

        expect(statusCode).toBe(200);
        expect(body).toStrictEqual(getBalance(personId));
      });
    });

    describe("given the person has balance and a new transaction as credit is sent", () => {
      it("should return a 200 status and the correct balance", async () => {
        const personId = 1;
        const newCreditTransaction = (personId: number): AddTransaction => {
          return {
            personId,
            amount: 200,
            type: Type.Credit,
          };
        };
        const { statusCode } = await request(app)
          .post(`/api/transactions/`)
          .send(newCreditTransaction(personId));

        const balanceResponse = await request(app).get(
          `/api/balance/${personId}`
        );

        expect(statusCode).toBe(200);
        expect(balanceResponse.body).toStrictEqual(getBalance(personId));
      });
    });
  });
});
