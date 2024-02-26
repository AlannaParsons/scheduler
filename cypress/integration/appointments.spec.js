import "cypress-real-events";

describe("Appointments", () => {

    beforeEach(() => {
        //cy.request("GET", "/api/debug/reset");
      
        cy.visit("/");
      
        cy.contains("Monday");
       });
    
    it("should book an interview", () => {
        cy.visit("/");
        //cy.contains(".schedule", "1pm");
        cy.contains("Monday");
        cy.get('[alt="Add"]')
            .first()
            .click();
        cy.get('[data-testid="student-name-input"]').type("Cypress Add");
        cy.get("[alt='Sylvia Palmer']").click();
        cy.get(".button--confirm").click();
        cy.get('[alt="Loading"]').should("exist");
        cy.contains('[data-testid="appointment"]', "1pm")
          .children()
          .should("have.class", "appointment__card--show");
        cy.contains(".appointment__card--show", "Cypress Add");
        cy.contains(".appointment__card--show", "Sylvia Palmer");

      });
  
      it("should edit an interview", () => {
        cy.visit("/");
        cy.contains(".appointment__card--show", "Cypress Add")
          .realHover()
          .find('[alt="Edit"]').click();
        cy.get('[data-testid="student-name-input"]')
          .clear()
          .type("Cypress Edit");
        cy.get("[alt='Tori Malcolm']").click();
        cy.get(".button--confirm").click();
        cy.get('[alt="Loading"]').should("not.exist");
        cy.get('.student--show')
          .eq(1)
          .should("have.text", "Cypress Edit");

        cy.contains(".appointment__card--show", "Cypress Edit");
        cy.contains(".appointment__card--show", "Tori Malcolm");
      });
  
      it("should cancel an interview", () => {
        cy.visit("/");
        cy.contains(".appointment__card--show", "Cypress Edit")
          .realHover()
          .find('[alt="Delete"]').click();
        cy.get(".appointment__card--confirm").should("exist");
        cy.get(".button--confirm").click();
        cy.get('[alt="Loading"]').should("exist");
        cy.get(".appointment__add").should("exist");
        cy.contains(".appointment__card--show", "Cypress Edit")
        .should("not.exist");
      });
        
})