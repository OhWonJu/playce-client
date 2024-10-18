describe("Join Page test", () => {
  beforeEach(() => {
    cy.visit("/join");
  });

  describe("약관 동의 조건 테스트", () => {
    beforeEach(() => {
      cy.getDataTest("submit-button").should("be.disabled");
      cy.getDataTest("accept-all").click();
    });

    it("모든 약관 동의하기 버튼", () => {
      cy.getDataTest("submit-button").should("be.enabled");

      cy.getDataTest("accept-0", "span").should("have.class", "text-primary");
      cy.getDataTest("accept-1", "span").should("have.class", "text-primary");
      cy.getDataTest("accept-2", "span").should("have.class", "text-primary");
      cy.getDataTest("accept-3", "span").should("have.class", "text-primary");
    });

    it("선택 약관 비활성화", () => {
      cy.getDataTest("accept-3").click();
      cy.getDataTest("submit-button").should("be.enabled");
    });

    it("필수 약관 비활성화", () => {
      cy.getDataTest("accept-0").click();
      cy.getDataTest("submit-button").should("be.disabled");
      cy.getDataTest("accept-0").click();
      cy.getDataTest("submit-button").should("be.enabled");

      cy.getDataTest("accept-1").click();
      cy.getDataTest("submit-button").should("be.disabled");
      cy.getDataTest("accept-1").click();
      cy.getDataTest("submit-button").should("be.enabled");

      cy.getDataTest("accept-2").click();
      cy.getDataTest("submit-button").should("be.disabled");
      cy.getDataTest("accept-2").click();
      cy.getDataTest("submit-button").should("be.enabled");
    });
  });

  describe("Form 입력", () => {
    beforeEach(() => {
      cy.getDataTest("accept-all").click();
    });

    describe("UserName 입력", () => {
      it("User Name 입력 - 2글자 미만", () => {
        cy.getDataTest("username-input").type("T");

        cy.getDataTest("submit-button").click();

        cy.getDataTest("username-message").should(
          "contain.text",
          "닉네임은 최소 2자 이상이어야 합니다.",
        );
      });
      it("User Name 입력 - 11글자 초과", () => {
        cy.getDataTest("username-input").type("1234567891011");

        cy.getDataTest("submit-button").click();

        cy.getDataTest("username-message").should(
          "contain.text",
          "닉네임은 최대 11자 이하이어야 합니다.",
        );
      });
      it("User Name 입력 - 조합 오류", () => {
        cy.getDataTest("username-input").type("ABC 1234");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("username-message").should(
          "contain.text",
          "닉네임은 영문, 한글, 숫자 조합이어야 합니다.",
        );
        cy.getDataTest("username-input").clear();

        cy.getDataTest("username-input").type("한글 1234");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("username-message").should(
          "contain.text",
          "닉네임은 영문, 한글, 숫자 조합이어야 합니다.",
        );
        cy.getDataTest("username-input").clear();

        cy.getDataTest("username-input").type("1234");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("username-message").should(
          "contain.text",
          "닉네임은 영문, 한글, 숫자 조합이어야 합니다.",
        );
      });
    });

    describe("Password 입력", () => {
      it("Password 입력 - 8글자 미만", () => {
        cy.getDataTest("password-input").type("test");

        cy.getDataTest("submit-button").click();

        cy.getDataTest("password-message").should(
          "contain.text",
          "비밀번호는 최소 8자 이상이어야 합니다.",
        );
      });
      it("Password 입력 - 11글자 초과", () => {
        cy.getDataTest("password-input").type("1234567891011");

        cy.getDataTest("submit-button").click();

        cy.getDataTest("password-message").should(
          "contain.text",
          "비밀번호는 최대 11자 이하이어야 합니다.",
        );
      });
      it("Password 입력 - 조합 조건", () => {
        cy.getDataTest("password-input").type("ABC12345");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("password-message").should(
          "contain.text",
          "비밀번호는 숫자, 영문 대소문자, !@#$%를 포함해야 합니다.",
        );
        cy.getDataTest("password-input").clear();

        cy.getDataTest("password-input").type("abc12345");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("password-message").should(
          "contain.text",
          "비밀번호는 숫자, 영문 대소문자, !@#$%를 포함해야 합니다.",
        );
        cy.getDataTest("password-input").clear();

        cy.getDataTest("password-input").type("Abc12!@#$%^");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("password-message").should(
          "contain.text",
          "비밀번호는 숫자, 영문 대소문자, !@#$%를 포함해야 합니다.",
        );
        cy.getDataTest("password-input").clear();

        cy.getDataTest("password-input").type("teSt!23%");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("password-message").should("not.exist");
      });
      it("Password - PasswordCheck", () => {
        cy.getDataTest("password-input").type("teSt!23%");
        cy.getDataTest("password-check-input").type("teSt!23^");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("password-check-message").should(
          "contain.text",
          "비밀번호가 일치하지 않습니다.",
        );

        cy.getDataTest("password-input").clear();
        cy.getDataTest("password-check-input").clear();
        cy.getDataTest("password-input").type("teSt!23%");
        cy.getDataTest("password-check-input").type("teSt!23%");
        cy.getDataTest("password-check-message").should("not.exist");
      });
    });

    describe("Email 입력", () => {
      it("Email 미 입력", () => {
        cy.getDataTest("submit-button").click();
        cy.getDataTest("email-message").should(
          "contain.text",
          "유효한 이메일 주소를 입력하세요.",
        );
      });

      it("Email 입력", () => {
        cy.getDataTest("email-input").type("@test@mail.com");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("email-message").should(
          "contain.text",
          "유효한 이메일 주소를 입력하세요.",
        );
        cy.getDataTest("email-input").clear();

        cy.getDataTest("email-input").type("testmail.com");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("email-message").should(
          "contain.text",
          "유효한 이메일 주소를 입력하세요.",
        );
        cy.getDataTest("email-input").clear();

        cy.getDataTest("email-input").type("test@mailcom");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("email-message").should(
          "contain.text",
          "유효한 이메일 주소를 입력하세요.",
        );
        cy.getDataTest("email-input").clear();

        cy.getDataTest("email-input").type("test@mail.com");
        cy.getDataTest("submit-button").click();
        cy.getDataTest("email-message").should("not.exist");
      });
    });
  });
});
