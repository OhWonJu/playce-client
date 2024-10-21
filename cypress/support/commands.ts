/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { mount } from "cypress/react18";
import "cypress-react-selector";

Cypress.Commands.add("mount", (component, options) => {
  // Wrap any parent components needed
  // ie: return mount(<MyProvider>{component}</MyProvider>, options)
  return mount(component, options);
});

Cypress.Commands.add(
  "getDataTest",
  (dataTestSelector: string, option?: string) => {
    return cy.get(`[data-test="${dataTestSelector}"] ${option ? option : ""}`);
  },
);

Cypress.Commands.add("login", () => {
  cy.setCookie("playce_access_token", "test");
  cy.setCookie("playce_refresh_token", "test");
  window.localStorage.setItem(
    "playce_expired_at",
    (new Date().getTime() + 3600000).toString(),
  );

  cy.window()
    .its("Storage.useAuthStore")
    .invoke("getState")
    .its("setIsLogin")
    .then(setIsLogin => {
      setIsLogin(true);
    });

  cy.window()
    .its("Storage.useMeStore")
    .invoke("getState")
    .its("setMe")
    .then(setMe => {
      setMe({
        id: "test",
        nickName: "Test",
        image: "",
        currentPlayListId: "",
        currentPlayTime: 0,
        currentTrackId: "",
      });
    });

  // cy.window()
  //   .its("Storage.useAuthStore")
  //   .invoke("setState", { isLogin: true });

  // cy.window()
  //   .its("Storage.useAuthStore")
  //   .invoke("getState")
  //   .its("isLogin")
  //   .should("eq", true);
});
