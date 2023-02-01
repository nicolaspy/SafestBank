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
      // cy.intercept("http://localhost:5173/api/transactions", {
      //   fixture: "/transactionsData.json",
      // });
      const id = "1";
      cy.visit("http://localhost:5173/");

      cy.get('input[placeholder="Identification"').type(id);
      cy.get('input[placeholder="Password"').type(id);
      cy.contains("Login").click();

      cy.request({
        method: "GET",
        url: `/api/balance/${id}`,
      }).then((response) => {
        expect(response.body).to.eq("1000");
      });
    });
  });
  describe("transaction view displays the correct information of the current logged in User", () => {
    it("displays the correct balance of the current logged in User", () => {
      cy.request({
        method: "GET",
        url: "http://localhost:5173/api/transactions/1",
      }).then((response) => {
        expect(response.body).to.eq("1000");
      });
    });
  });
});
