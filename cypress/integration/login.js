/// <reference types="Cypress" />
import "cypress-localstorage-commands"
import {email, password} from "../fixtures/login";

describe("Login page test", () => {


    before(() => {
        cy.clearLocalStorage();
    });

    it("User can login", () => {
        cy.intercept(
                "POST",
                Cypress.env("server_url") + "/api/login-user",
                {
                    success: true,
                    id: Cypress.env("uid"),
                    tokens: {
                        access: "123.123.123",
                        refresh: "456.456.456",
                    },
                    isUser: true,
                }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input#email").type(email);
        cy.get("input#password").type(password);
        cy.get(".confirm-button").click();

        cy.wait(["@login-route"]);

        cy.get(".error-message").should("not.exist");

        cy.getLocalStorage("uid").should("equal", Cypress.env("uid"));
        cy.getLocalStorage("accessToken").should("equal", "123.123.123");
        cy.getLocalStorage("refreshToken").should("equal", "456.456.456");
        cy.getLocalStorage("isUser").should("equal", "true");

        cy.location('pathname').should('eq', '/');
    });

    it("Doctor can login", () => {
        cy.intercept(
                "POST",
                Cypress.env("server_url") + "/api/login-user",
                {
                    success: true,
                    id: Cypress.env("uid"),
                    tokens: {
                        access: "123.123.123",
                        refresh: "456.456.456",
                    },
                    isUser: false,
                }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input#email").type(email);
        cy.get("input#password").type(password);
        cy.get(".confirm-button").click();

        cy.wait(["@login-route"]);

        cy.get(".error-message").should("not.exist");

        cy.getLocalStorage("uid").should("equal", Cypress.env("uid"));
        cy.getLocalStorage("accessToken").should("equal", "123.123.123");
        cy.getLocalStorage("refreshToken").should("equal", "456.456.456");
        cy.getLocalStorage("isUser").should("equal", "false");

        cy.location('pathname').should('eq', '/');
    });

    it("Can't login with invalid email or password", () => {
        cy.intercept(
                "POST",
                Cypress.env("server_url") + "/api/login-user",
                {
                    statusCode: 400,
                    body: {
                        success: false,
                        error: "invalid_password",
                        message: `User have another password`,
                    }
                }
        ).as("login-route")

        cy.visit(Cypress.env("url") + "/login");

        cy.get("input#email").type(email);
        cy.get("input#password").type(password);
        cy.get(".confirm-button").click();

        cy.wait(["@login-route"]);

        cy.get(".error-message").contains( "Неверный email или пароль");

        cy.getLocalStorage("uid").should("not.exist");
        cy.getLocalStorage("accessToken").should("not.exist");
        cy.getLocalStorage("refreshToken").should("not.exist");
        cy.getLocalStorage("isUser").should("not.exist");

        cy.location('pathname').should('eq', '/login');
    });

    it("Can redirect to signup", () => {
        cy.visit(Cypress.env("url") + "/login");
        cy.get("span.signup-link").click();
        cy.location('pathname').should('eq', '/signup');
    });

    it("Can redirect to forgot password page", () => {
        cy.visit(Cypress.env("url") + "/login");
        cy.get("span.forgot-password-link").click();
        cy.location('pathname').should('eq', '/reset-password-from-email');
    });
});
