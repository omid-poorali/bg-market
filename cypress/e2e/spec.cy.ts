describe('e2e tests', () => {
  it('home page check', () => {
    cy.visit('/');
    cy.getBySel('p1').should('have.text', 'BG Market Watch');
    cy.getBySel('p2').should('have.text', 'Find promising coins and great opportunities! ');
    cy.getBySel('sf1').should('have.attr', 'placeholder', 'Search');
  });

  it('change page number', () => {
    cy.visit('/');
    cy.getBySel('pagination-right').click();
    cy.getBySel('pagination-2').should('have.class', 'dark:bg-darkmode-400');
  });

  it('search for btc coin', () => {
    cy.visit('/');
    cy.getBySel('sf1').type('btc');
    cy.getBySel("coin-symbol-0").should('include.text', 'BTC');
  });
})