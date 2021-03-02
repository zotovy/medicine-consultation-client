/// <reference types="Cypress" />
import "cypress-localstorage-commands"
import user, { tokens } from "../fixtures/user";

describe("Signup page tests", () => {
    before(() => {
        cy.clearLocalStorage();
    });

    it("should signup user", () => {
        cy.intercept(
                "POST",
                Cypress.env("server_url") + "/api/user",
                {
                    success: true,
                    user,
                    tokens,
                },
                (req) => {
                    expect(req.body.name).equal(user.name);
                    expect(req.body.surname).equal(user.surname);
                    expect(req.body.phone).equal(user.phone);
                    expect(req.body.email).equal(user.email);
                    expect(req.body.password).equal(user.password);
                    expect(req.body.sex).equal(true);
                    expect(req.body.notificationEmail).equal(user.notificationEmail);
                    expect(req.body.sendNotificationToEmail).equal(user.sendNotificationToEmail);
                    expect(req.body.sendMailingsToEmail).equal(user.sendMailingsToEmail);
                }

        ).as("login-route")

        cy.visit(Cypress.env("url") + "/signup");

        cy.get("input[data-test=name]").type(user.name).should("exist");
        cy.get("input[data-test=surname]").type(user.surname).should("exist");
        cy.get("input[data-test=phone]").type(user.phone).should("exist");
        cy.get("input[data-test=email]").type(user.email).should("exist");
        cy.get("input[data-test=password]").type(user.password).should("exist");
        cy.get("input[data-test=confirm-password]").type(user.password).should("exist");
        cy.get("input[data-test=male-checkbox]").check().should("be.checked");
        cy.get("input[data-test=female-checkbox]").should("not.be.checked");
        cy.get("input[data-test=agree-terms-checkbox]").should("be.checked");
        cy.get("input[data-test=mailing-checkbox]").should("be.checked");

        cy.get("[data-test=confirm]").click();
        cy.location('pathname').should('eq', '/');
    });

    /**
     * todo: обработать следующие сценарии
     *  - должен ругатся на пустые обязательные поля
     *  - должен ругатся на дубликацию email
     *  - должен ругатся на слишком слабый пароль
     *  - должен ругатся на несогласие с пользовательском соглашением
     *  - по нажатию на "Регистрация для врачей" должен переходить на /doctor-signup
     */
});
