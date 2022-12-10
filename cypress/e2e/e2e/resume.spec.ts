beforeEach(() => {
  cy.visit('http://localhost:3000/resume');
});

/**
 * Verify my /resume page exists
 */
it('should exist', () => {
  cy.get('h1')
    .contains(/resume/i)
    .should('exist');
});

it('should contain an email contact', () => {
  cy.get('a[href*="mailto:eric.j.masiello@gmail.com"]').should('exist');
});
