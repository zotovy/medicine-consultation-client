// /// <reference types="Cypress" />
// import React from "react";
// import { mount } from "@cypress/react";
// import doctor from "../fixtures/doctor";
// import FindDoctorPage from "../../modules/doctors/pages/find-doctor";
//
// describe("Test find doctor page", () => {
//
//     before(() => {
//         // @ts-ignore
//         cy.login();
//     });
//
//     it("should find doctors", () => {
//         // @ts-ignore
//         mount(<FindDoctorPage doctors={[doctor]} />);
//
//         cy.wait(["@find-doctor"]);
//         cy.get(".doctor-container").children(".doctor").should("have.length", 1);
//         cy.get(".doctor .image").should("have.css", "background-image", `url("${doctor.photoUrl}")`);
//         cy.get(".doctor h3").should("have.value", doctor.fullName);
//         cy.get(".doctor .speciality-and-age").should("have.value", "Педиатр");
//         cy.get(".doctor .rating .active-star-icon").should("have.length", Math.floor(doctor.rating));
//         cy.get(".doctor .rating .disable-star-icon").should("have.length", 5 - Math.floor(doctor.rating));
//         cy.get(".doctor .rating .half-star-icon").should("have.length", Math.ceil(doctor.rating - Math.floor(doctor.rating)));
//
//     });
//
// });

/**
 * todo: hooooow to test ssr????
 */
