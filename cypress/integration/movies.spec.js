describe('Movies Page', () => {
  it('perform search and redirect to Movie Item page', () => {
    cy.visit('/');

    expect(cy.get('[data-cy=no-movies]').contains('No Films Found'));

    cy.get('[data-cy=search-form]').within(() => {
      cy.get('input').type('The Book of Henry');
      cy.get('button').click();
    });
    expect(cy.get('[data-cy=results-number]').contains('1 movie(s) found'));

    expect(cy.get('[data-cy=movies-list]')
      .should('have.length', 1)
      .and(($div) => {
        expect($div.get(0).textContent, 'Movie name').contains('The Book of Henry');
      })
    );
    
  });

});
