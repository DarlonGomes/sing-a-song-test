
before(()=>{
 cy.createData()
});

describe('Visit, render and create', () => {
  it('visit homepage and render', () => {
    cy.visit('http://localhost:3000');
  });
  it('create a recommendation', () => {

    cy.get("input[data-cy=name]").type("Mansion Party - NSP");
    cy.get("input[data-cy=link]").type("https://www.youtube.com/watch?v=dNoafUU4Ikw");
    cy.intercept("GET", "/recommendations").as("getSongs");
    cy.get("button[data-cy=submit").click();
    cy.wait("@getSongs");
  });
  it('go to top recommendations', () => {
    cy.get("[data-cy=top]").click();
  })
});


after(()=>{
  cy.deleteData()
});