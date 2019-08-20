describe("The Login Page", () => {
  it("successfully loads", () => {
    cy.visit("/login");
  });
});

describe("Login form", () => {
  it("should require user to enter email address and password", () => {
    cy.get("[data-cy='login-btn']").click();
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The email field is required");
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The password field is required");
  });

  it("should require password to be 4 chars or more long", () => {
    cy.get("input[name='password']")
      .type("a")
      .blur();
    cy.get(
      ".error--text > .v-messages__wrapper > .v-messages__message"
    ).contains("The password field must be at least 4 characters");
  });

  it("shouldn't let user to login with wrong email/password", () => {
    cy.get("input[name='email']").type("wrong@email.com");
    cy.get("input[name='password']").type(`password{enter}`);

    cy.get("[data-cy='login-error']").contains(
      "Invalid credentilas! Please, try again."
    );
    cy.get("input[name='email']").clear();
    cy.get("input[name='password']").clear();
  });

  it("should let user login with right credentials", () => {
    const email = "john@doe.com";
    const password = "password";
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("[data-cy='login-btn']").click();

    cy.get("[data-cy='user-email']").contains(email);
  });
});

describe("Logut user", () => {
  it("user should be able to logout from application", () => {
    cy.get("button[data-cy='logout-btn']").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });
});
