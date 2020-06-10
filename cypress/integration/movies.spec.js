describe('Movies Page', () => {
  it('perform search and redirect to Movie Item page', () => {
    cy.visit('/');

    cy.get('[data-cy=search-form]').within(() => {
      cy.get('input').type('Once Upon');
      cy.get('button').click();
    });
    expect(cy.get('[data-cy=results-number]').contains('1 movie(s) found'));

    expect(cy.get('[data-cy=movies-list]')
      .should('have.length', 1)
      .and(($div) => {
        expect($div.get(0).textContent, 'Movie name').contains('Once Upon a Time in Hollywood');
      })
    );

    cy.get('[data-cy=movieId_2]').click();
    expect(cy.get('[data-cy=no-movies]').contains('No Films Found'));
  });

});
