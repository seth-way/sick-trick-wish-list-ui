beforeEach(() => {
  cy.intercept('http://localhost:3001/api/v1/tricks', {
    statusCode: 200,
    fixture: 'tricks',
  }).as('Get Tricks');

  cy.visit('http://localhost:3000/');
});

describe('initial homepage load', () => {
  it('loads the initial components', () => {
    cy.get('h1').contains('Sick Trick Wish List');
    cy.get('form').children().should('have.length', 5);
    cy.get('[name="stance"]').contains('Choose your Stance');
    cy.get('[name="name"]').should('have.attr', 'placeholder', 'Name of Trick');
    cy.get('[name="obstacle"]').contains('Choose your Obstacle');
    cy.get('[name="tutorial"]').should(
      'have.attr',
      'placeholder',
      'Link to Tutorial'
    );
    cy.get('button').contains('Send It!');
  });
});

describe('fetch & display tricks', () => {
  it('loads initial 3 tricks from fixture', () => {
    cy.get('.tricks').children().should('have.length', 3);
  });

  it('displays all trick info', () => {
    cy.get('.tricks > :nth-child(1').as('trick1');
    cy.get('@trick1').find('ul > :nth-child(1)').contains('regular treflip', {matchCase: false});
    cy.get('@trick1').find('ul > :nth-child(2)').contains('obstacle: flat ground', {matchCase: false});
    cy.get('@trick1').find('ul > :nth-child(3)').contains('link to tutorial:', {matchCase: false});
    cy.get('@trick1').find('ul > :nth-child(4) > a').contains('https://www.youtube.com/watch?v=XGw3YkQmNig', {matchCase: false});
  });
});
