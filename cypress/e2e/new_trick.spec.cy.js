beforeEach(() => {
  cy.intercept('http://localhost:3001/api/v1/tricks', {
    statusCode: 200,
    fixture: 'tricks',
  }).as('Get Tricks');

  cy.visit('http://localhost:3000/');
});

describe('create a new trick', () => {
  it('updates updates form on user inputs', () => {
    cy.get('[name="stance"]').select('Regular');
    cy.get('[name="stance"]').contains('Regular');
    cy.get('[name="obstacle"]').select('Rail');
    cy.get('[name="obstacle"]').contains('Rail');
  });

  it('creates new trick & resets inputs if all fields contain a value', () => {
    cy.get('[name="stance"]').select('Regular');
    cy.get('[name="name"]').type('Tricky new trick');
    cy.get('[name="obstacle"]').select('Rail');
    cy.get('[name="tutorial"]').type('http://www.tutorial.com');
    cy.get('button').click();

    // form is empty
    cy.get('[name="stance"]').contains('Choose your Stance');
    cy.get('[name="name"]').should('have.attr', 'placeholder', 'Name of Trick');
    cy.get('[name="obstacle"]').contains('Choose your Obstacle');
    cy.get('[name="tutorial"]').should(
      'have.attr',
      'placeholder',
      'Link to Tutorial'
    );
    // new trick is created
    cy.get('.tricks > :nth-child(4)').as('newestTrick');
    cy.get('@newestTrick')
      .find('ul > :nth-child(1)')
      .contains('regular Tricky new trick', { matchCase: false });
    cy.get('@newestTrick')
      .find('ul > :nth-child(2)')
      .contains('obstacle: Rail', { matchCase: false });
    cy.get('@newestTrick')
      .find('ul > :nth-child(3)')
      .contains('link to tutorial:', { matchCase: false });
    cy.get('@newestTrick')
      .find('ul > :nth-child(4) > a')
      .contains('http://www.tutorial.com', { matchCase: false });
  });

  it('creates new trick ONLY when all fields contain a value', () => {
    cy.get('button').click();
    cy.get('.tricks').children().should('have.length', 3);

    cy.get('[name="stance"]').select('Regular');
    cy.get('button').click();
    cy.get('.tricks').children().should('have.length', 3);

    cy.get('[name="name"]').type('Tricky new trick');
    cy.get('button').click();
    cy.get('.tricks').children().should('have.length', 3);

    cy.get('[name="obstacle"]').select('Rail');
    cy.get('button').click();
    cy.get('.tricks').children().should('have.length', 3);

    cy.get('[name="tutorial"]').type('http://www.tutorial.com');
    cy.get('button').click();
    cy.get('.tricks').children().should('have.length', 4);
  });
});
