describe("인증/인가 route 처리 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("비인증 유저의 인가가 필요한 페이지 접근", () => {
    cy.visit("/cabinet");
    cy.location("pathname").should("equal", "/access-denied");

    cy.visit("/cabinet/albums");
    cy.location("pathname").should("equal", "/access-denied");

    cy.visit("/cabinet/playlists");
    cy.location("pathname").should("equal", "/access-denied");

    cy.visit("/cabinet/playlists/1");
    cy.location("pathname").should("equal", "/access-denied");

    cy.visit("/cabinet/queue");
    cy.location("pathname").should("equal", "/access-denied");

    cy.visit("/");
    cy.location("pathname").should("equal", "/");

    cy.visit("/join");
    cy.location("pathname").should("equal", "/join");

    cy.visit("/oauth/callback");
    cy.location("pathname").should("include", "/oauth/callback");
  });

  it.only("인증 유저의 인가가 필요한 페이지 접근", () => {
    cy.intercept("http://localhost:4000/users/queue", {
      fixture: "user-queue.json",
    });
    cy.intercept("http://localhost:4000/users/me", {
      fixture: "user-me.json",
    });
    cy.intercept("http://localhost:4000/users/summary", {
      fixture: "user-summary.json",
    });
    cy.intercept("http://localhost:4000/albums/recommend", {
      fixture: "recommendAlbums.json",
    });

    cy.window()
      .its("Storage.useAuthStore")
      .invoke("getState")
      .its("isLogin")
      .should("eq", false);

    cy.login();

    cy.window()
      .its("Storage.useAuthStore")
      .invoke("getState")
      .its("isLogin")
      .should("eq", true);

    cy.visit("/cabinet");
    cy.location("pathname").should("equal", "/cabinet");

    cy.visit("/");
    cy.location("pathname").should("equal", "/home");

    cy.visit("/join");
    cy.location("pathname").should("equal", "/home");

    cy.visit("/oauth/callback");
    cy.location("pathname").should("equal", "/home");
  });
});
