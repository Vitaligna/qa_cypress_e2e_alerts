/// <reference types="cypress" />

describe('DemoQA Alerts Automation', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/alerts');
  });

  it('should assert text inside the first alert', () => {
    cy.get('#alertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('You clicked a button');
    });
  });

  it('should assert delayed alert appears without arbitrary wait', () => {
    cy.get('#timerAlertButton').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This alert appeared after 5 seconds');
    });
  });

  it('should assert confirmation alert and handle OK selection', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return true;
    });
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('should assert confirmation alert and handle Cancel selection', () => {
    cy.get('#confirmButton').click();
    cy.on('window:confirm', (confirmText) => {
      expect(confirmText).to.equal('Do you confirm action?');
      return false;
    });
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('should enter text in prompt alert and validate input', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Csilla');
    });
    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'You entered Csilla');
  });
});
