describe("Root Page Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("SymbolHeader content 정합성", () => {
    cy.getDataTest("symbol-header").contains(/PLAYCE/i);
    cy.getDataTest("symbol-description").should(
      "contain.text",
      "Connect your pysical albums",
    );
  });

  it("PLAYCE 시작하기 버튼은 loginModal 을 활성화시켜야함. / 모달의 X 버튼은 모달을 비활성화시켜야함.", () => {
    cy.getDataTest("login-modal-body").should("not.exist");
    cy.getDataTest("login-button").click();
    cy.getDataTest("login-modal-body").should("exist");

    cy.getDataTest("modal-header", "button").click();
    cy.getDataTest("login modal-body").should("not.exist");
  });
});
