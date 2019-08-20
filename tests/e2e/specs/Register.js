describe("The Register Page", () => {
  it("successfully loads", () => {
    cy.visit("/register");
  });
});

describe("Register form", () => {
  it("should require user to enter email address, password and confirm password", () => {
    cy.get("[data-cy='register-btn']").click();
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The email field is required");
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The password field is required");
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The confirm password field is required");
  });

  it("should require password to be 4 chars or more long", () => {
    cy.get("input[name='password']")
      .type("a")
      .blur();
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The password field must be at least 4 characters");
    cy.get("input[name='password']").clear();
  });

  it("should require password and confirm password to be same", () => {
    cy.get("input[name='password']").type("password");
    cy.get("input[name='confirmPassword']")
      .type("different_password")
      .blur();
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The confirm password confirmation does not match");
    cy.get("input[name='password']").clear();
    cy.get("input[name='confirmPassword']").clear();
  });

  it("shouldn't let user register with existing email", () => {
    const email = "john@doe.com";
    const password = "password123";
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirmPassword']").type(password);
    cy.get("[data-cy='register-btn']").click();
    cy.get("[data-cy='register-error']").contains("Email already in use!");
    cy.get("input[name='email']").clear();
    cy.get("input[name='password']").clear();
    cy.get("input[name='confirmPassword']").clear();
  });

  it("should let user register with correct input data", () => {
    const email = "new@user.com";
    const password = "password123";
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirmPassword']").type(password);
    cy.get("[data-cy='register-btn']").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it("newly registered user should be able to login", () => {
    const email = "new@user.com";
    const password = "password123";
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("[data-cy='login-btn']").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });
    cy.get("[data-cy='user-email']").contains(email);
  });
});
