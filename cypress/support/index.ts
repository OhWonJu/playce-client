import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;

      getDataTest(
        dataTestSelector: string,
        option?: string,
      ): Chainable<JQuery<HTMLElement>>;

      login(): void;
    }
  }
}
