/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("example to-do app", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // todo
    // 后面需要基于环境来区分不同的 host
    cy.visit("/");
  });

  it('should be show one-step', () => {
    cy.contains("home")
    cy.contains("to about")
    cy.contains("store - counter")
    cy.contains("count: 0 increment")
  });

  it('should be go to about', () => {
    cy.contains("to about").click()
    cy.contains("about")
  });

  it('should increment', () => {
    cy.contains("increment").click()
    cy.contains("home")
    cy.contains("to about")
    cy.contains("store - counter")
    cy.contains("count: 1 increment")
  });
});
