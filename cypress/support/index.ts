declare global {
  namespace Cypress {
    interface Chainable {
      getDataTest(
        dataTestSelector: string,
        option?: string,
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
