import user, { tokens } from "../fixtures/user";
import doctor from "../fixtures/doctor";

import "cypress-localstorage-commands"

Cypress.Commands.add("login", (isUser = true) => {
    if (isUser) cy.setLocalStorage("uid", user.id);
    else cy.setLocalStorage("uid", doctor.id);

    cy.setLocalStorage("accessToken", tokens.access);
    cy.setLocalStorage("refreshToken", tokens.refresh);
    cy.setLocalStorage("isUser", isUser.toString());
})
