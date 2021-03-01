/// <reference types="Cypress" />

describe("Login page test", () => {

    it("Visit the login page", () => {
        cy.visit(Cypress.env("url") + "/login");
    });
});
