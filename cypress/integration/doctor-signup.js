/// <reference types="Cypress" />
import "cypress-localstorage-commands"
import { tokens } from "../fixtures/user";
import doctor from "../fixtures/doctor";

describe("Signup page tests", () => {
    before(() => {
        cy.clearLocalStorage();
    });

    it("should signup doctor", () => {
        cy.intercept(
                "POST",
                Cypress.env("server_url") + "/api/doctor",
                {
                    success: true,
                    doctor,
                    tokens,
                },
                (req) => {
                    expect(req.body.name).equal(doctor.name);
                    expect(req.body.surname).equal(doctor.surname);
                    expect(req.body.phone).equal(doctor.phone);
                    expect(req.body.email).equal(doctor.email);
                    expect(req.body.password).equal(doctor.password);
                    expect(req.body.sex).equal(true);
                    expect(req.body.notificationEmail).equal(doctor.notificationEmail);
                    expect(req.body.sendNotificationToEmail).equal(doctor.sendNotificationToEmail);
                    expect(req.body.sendMailingsToEmail).equal(doctor.sendMailingsToEmail);
                }

        ).as("login-route")

        cy.visit(Cypress.env("url") + "/doctor-signup");

        cy.get("input[data-test=name]").type(doctor.name).should("exist");
        cy.get("input[data-test=surname]").type(doctor.surname).should("exist");
        cy.get("input[data-test=phone]").type(doctor.phone).should("exist");
        cy.get("input[data-test=email]").type(doctor.email).should("exist");
        cy.get("input[data-test=password]").type(doctor.password).should("exist");
        cy.get("input[data-test=confirm-password]").type(doctor.password).should("exist");
        cy.get("input[data-test=male-checkbox]").check().should("be.checked");
        cy.get("input[data-test=female-checkbox]").should("not.be.checked");
        cy.get("[data-test=confirm]").click();

        cy.get("[data-test=page-1]").should("have.class", "minus55")
        cy.get("[data-test=page-2]").should("have.class", "minus55")
        cy.get("[data-test=page-3]").should("have.class", "minus55")

        cy.get("input[data-test=education]").type(doctor._education);
        cy.get("input[data-test=speciality]").type(doctor.speciality[0]);
        cy.get("input[data-test=education-years]").type(doctor.yearEducation);
        cy.get("input[data-test=blank-series]").type(doctor.blankSeries);
        cy.get("input[data-test=blank-number]").type(doctor.blankNumber);
        cy.get(".calendar-container").should("have.class", "calendar-container-disable");
        cy.get("input[data-test=date-field]").focus();
        cy.get(".calendar-container .week span.today")
                .should("not.have.class", "calendar-container-disable")
                .click();
        cy.get(".calendar-container .button-container button.confirm").click();
        cy.get("[data-test=confirm-2]").click();

        cy.get("[data-test=page-1]").should("have.class", "minus110")
        cy.get("[data-test=page-2]").should("have.class", "minus110")
        cy.get("[data-test=page-3]").should("have.class", "minus110")

        cy.get("input[data-test=issuedByWhom]").type(doctor.passportIssuedByWhom);
        cy.get("input[data-test=series]").type(doctor.passportSeries);
        cy.get("input[data-test=issueDate]").type(doctor.issueDate);
        cy.get("input[data-test=experience]").type(doctor.experience.toString());
        cy.get("input[data-test=work-place]").type(doctor.workPlaces.join(", "));
        cy.get("[data-test=confirm-3]").click();

        cy.location('pathname', { timeout: 7000 }).should('eq', '/');
    });

    /**
     * todo: обработать следующие сценарии
     *  - должен ругатся на пустые обязательные поля
     *  - должен ругатся на дубликацию email
     *  - должен ругатся на слишком слабый пароль
     */
});
