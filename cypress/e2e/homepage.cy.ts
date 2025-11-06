/// <reference types="cypress" />

describe('Homepage User Flow', () => {
  it('should allow a user to visit the homepage and navigate to a recipe', () => {
    // 1. Visit the homepage. Make sure your dev server is running.
    cy.visit('http://localhost:3000');

    // 2. Find the main heading and check that it's visible.
    cy.contains('h1', 'Get Inspired, Cook with passion and').should('be.visible');

    // 3. Find the list of recipe cards and check that there's more than one.
    cy.get('article').should('have.length.greaterThan', 1);

    // 4. Find the first recipe card and click its link.
    cy.get('article').first().find('a').click();

    // 5. Check that the URL has changed to a recipe detail page.
    cy.url().should('include', '/recipe/');

    // 6. Check that the new page has a recipe title.
    cy.get('h1').should('not.be.empty');
  });
    it('should allow a user to search for a recipe', () => {
    // 1. Visit the homepage
    cy.visit('http://localhost:3000');

    // 2. Find the search input, type "chicken" into it, and press Enter.
    // NOTE: You may need to adjust the selector below to match your actual search input.
    // Common selectors are input[name="search"] or input[type="search"].
    cy.get('input[placeholder="Search Recipe"]')
      .filter(':visible')
      .type('chicken{enter}');
    // 3. Check that the URL now includes the search query.
    cy.url().should('include', '/recipe?q=chicken');

    // 4. Check that a search results heading is now visible.
    cy.contains('Results for').should('be.visible');

    // 5. Verify that every recipe card shown in the results contains "chicken".

    cy.get('article').contains('chicken', { matchCase: false });
  });

});