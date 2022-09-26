/*eslint-disable cypress/no-unnecessary-waiting */
before(() => {
  cy.deleteData();
  cy.createData();
});

describe("Visit, render and create", () => {
  it("visit homepage and render", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
    cy.wait(3000);
  });

  it("check articles length", () => {
    cy.get("body")
      .find("article")
      .then((list) => {
        expect(list.length).to.be.lessThan(11);
      });
  });

  it("create a recommendation", () => {
    cy.get("input[data-cy=name]")
      .type("Mansion Party - NSP")
      .should("have.value", "Mansion Party - NSP");

    cy.get("input[data-cy=link]")
      .type("https://www.youtube.com/watch?v=dNoafUU4Ikw")
      .should("have.value", "https://www.youtube.com/watch?v=dNoafUU4Ikw");

    cy.intercept("GET", "/recommendations").as("getSongs");

    cy.get("button[data-cy=submit").click();

    cy.wait("@getSongs");
  });

  it("check articles length after insertion", () => {
    cy.get("body")
      .find("article")
      .then((list) => {
        expect(list.length).to.be.equal(10);
      });
  });
});

describe("Visit top recommendations and validate song", () => {
  let firstScore = 0;
  let secondScore = 0;
  it("visit top page and render", () => {
    cy.get("[data-cy=top-route]").click();
    cy.url().should("eq", "http://localhost:3000/top");
  });
  it("Check the articles length", () => {
    cy.get("body").find("article").should("have.length", 10);
  });

  it("Check the first articles score", () => {
    cy.get("[data-cy=recommendation-score]")
      .eq(0)
      .invoke("text")
      .then((text) => {
        firstScore = Number(text);
        expect(text).to.eq("20");
        return;
      });
  });

  it("Check the second articles score", () => {
    cy.get("[data-cy=recommendation-score]")
      .eq(1)
      .invoke("text")
      .then((text) => {
        secondScore = Number(text);
        expect(text).to.eq("12");
        return;
      });
  });

  it("Check first and second scores", () => {
    cy.wrap(firstScore).should("be.gt", secondScore);
  });
});

describe("Random recommendations", () => {
  let suggestedScore = 0;

  it("visit random page", () => {
    cy.get("[data-cy=random-route]").click();
    cy.url().should("eq", "http://localhost:3000/random");
  });

  it("check random article", () => {
    cy.get("[data-cy=recommendation-name]")
      .invoke("text")
      .then((text) => {
        expect(text).to.not.equal("");
      });
  });

  it("listen to the random article beautiful song", () => {
    cy.get("[data-cy=play]").first("button").click();

    //This one doesn't work... sad
  });

  it("like the suggested song", () => {
    cy.get("[data-cy=recommendation-score]")
      .invoke("text")
      .then((text) => {
        const score = Number(text);
        suggestedScore = score;
        expect(score).to.be.greaterThan(-1);
      });
  });

  it("validates song new score", () => {
    cy.get("[data-cy=upvote]").click();
    cy.wait(2000);
    cy.get("[data-cy=recommendation-score]")
      .invoke("text")
      .then((text) => {
        const score = Number(text);
        expect(score).to.be.greaterThan(suggestedScore);
      });
  });
});

describe("Go back to home and remove a song", () => {
  it("visit homepage again", () => {
    cy.get("[data-cy=home-route]").click();
  });

  it("search for a music that you didn't liked", () => {
    cy.get("[data-cy=recommendation-score]").eq(2).scrollIntoView();

    //this isn't the final target, but it works
  });

  it("downvote it", () => {
    cy.get("[data-cy=downvote]").eq(5).click();
  });

  it("check if the song has been removed", () => {
    cy.get("[data-cy=recommendation-name]")
      .eq(5)
      .invoke("text")
      .then((text) => {
        expect(text).to.not.be.equal("Naldo Benny feat. Gucci Boy - Breezy");
      });
  });
});

after(() => {});
