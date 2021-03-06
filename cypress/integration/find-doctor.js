/// <reference types="Cypress" />
import doctor from "../fixtures/doctor";
import nock from "nock";

describe("Test find doctor page", () => {

    before(() => {
        if (!nock.isActive()) nock.activate()
        cy.login();
    });


    it("should find doctors", () => {

        const a = nock("http://localhost:5000")
            .get("/api/doctors")
            .reply(200, {
                success: true,
                doctors: [doctor],
            })
        console.log(nock.activeMocks());

        fetch("http://localhost:5000/api/doctors").then(data => console.log(data));

        // console.log(scope);

        cy.visit(Cypress.env("url") + "/find-doctor");
        cy.get(".doctor-container").children(".doctor").should("have.length", 1);
        cy.get(".doctor .image").should("have.css", "background-image", `url("${doctor.photoUrl}")`);
        cy.get(".doctor h3").should("have.value", doctor.fullName);
        cy.get(".doctor .speciality-and-age").should("have.value", "Педиатр");
        cy.get(".doctor .rating .active-star-icon").should("have.length", Math.floor(doctor.rating));
        cy.get(".doctor .rating .disable-star-icon").should("have.length", 5 - Math.floor(doctor.rating));
        cy.get(".doctor .rating .half-star-icon").should("have.length", Math.ceil(doctor.rating - Math.floor(doctor.rating)));
    });
});

/**
 * todo: hooooow to test ssr????
 */
