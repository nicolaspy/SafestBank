import { Balance } from "../../src/types";
import { getNumbertoAmount } from "../../src/utlis/common";

describe("transaction view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should login correctly", () => {
    cy.get('input[placeholder="Identification"').type("1");
    cy.get('input[placeholder="Password"').type("1");
    cy.contains("Login").click();
    cy.contains("Hey there");
  });

  it("shows an error when login unsuccessful", () => {
    cy.get('input[placeholder="Identification"').type("1");
    cy.get('input[placeholder="Password"').type("2222");
    cy.contains("Login").click();
    cy.contains("Login error");
  });
});
describe("when logged in", () => {
  describe("transaction view displays the correct information of the current logged in User", () => {
    it("displays the correct balance of the current logged in User", () => {
      cy.fixture("no_balance.json").then((fixture: Balance) => {
        const id = fixture.personId.toString();
        cy.intercept("GET", `http://localhost:5173/api/balance/${id}`, fixture);
        cy.intercept("GET", `http://localhost:5173/api/transactions/${id}`, {
          fixture: "transactionsData.json",
        });
        cy.visit("http://localhost:5173/");

        cy.get('input[placeholder="Identification"').type(id);
        cy.get('input[placeholder="Password"').type(id);

        cy.contains("Login").click();

        cy.contains(`Balance is: $${getNumbertoAmount(fixture.balance)}`);
      });
    });
  });
  describe("when a user wants to withdraw more than his current balance", () => {
    it("displays Insufficient funds as error message", () => {
      cy.fixture("no_balance.json").then((fixture: Balance) => {
        const id = fixture.personId.toString();
        cy.intercept("GET", `http://localhost:5173/api/balance/${id}`, fixture);
        cy.intercept("GET", `http://localhost:5173/api/transactions/${id}`, {
          fixture: "transactionsData.json",
        });

        cy.visit("http://localhost:5173/");

        cy.get('input[placeholder="Identification"').type(id);
        cy.get('input[placeholder="Password"').type(id);
        cy.contains("Login").click();
        cy.contains("Withdraw").click();
        cy.get("#debit_amount").type("99999999{enter}", { force: true });
        cy.contains("Insufficient funds");
      });
    });
  });
  describe("when a user wants to withdraw less than his current balance", () => {
    it("displays Success! notification message", () => {
      cy.fixture("balanceData.json").then((fixture: Balance) => {
        const id = fixture.personId.toString();
        const debitAmount = 1;
        cy.intercept("GET", `http://localhost:5173/api/balance/${id}`, fixture);
        cy.intercept("GET", `http://localhost:5173/api/transactions/${id}`, {
          fixture: "transactionsData.json",
        });

        cy.visit("http://localhost:5173/");

        cy.get('input[placeholder="Identification"').type(id);
        cy.get('input[placeholder="Password"').type(id);
        cy.contains("Login").click();
        cy.contains("Withdraw").click();
        cy.get("#debit_amount").type(`${debitAmount}{enter}`, { force: true });
        cy.contains(
          `You have successfully withdrawn $${getNumbertoAmount(
            debitAmount
          )} of your account`
        );
      });
    });
    describe("when a user wants to make a deposit", () => {
      it("displays Success! notification message and updates balance", () => {
        cy.fixture("no_balance.json").then((fixture: Balance) => {
          const id = fixture.personId.toString();
          const creditAmount = 1;
          cy.intercept(
            "GET",
            `http://localhost:5173/api/balance/${id}`,
            fixture
          );
          cy.intercept("GET", `http://localhost:5173/api/transactions/${id}`, {
            fixture: "transactionsData.json",
          });

          cy.visit("http://localhost:5173/");

          cy.get('input[placeholder="Identification"').type(id);
          cy.get('input[placeholder="Password"').type(id);
          cy.contains("Login").click();
          cy.contains("Deposit").click();
          cy.get("#credit_amount").type(`${creditAmount}{enter}`, {
            force: true,
          });
          cy.contains(
            `You have successfully deposited $${getNumbertoAmount(
              creditAmount
            )} into your account`
          );
          cy.contains(
            `Balance is: $${getNumbertoAmount(fixture.balance + creditAmount)}`
          );
        });
      });
    });
  });
});
