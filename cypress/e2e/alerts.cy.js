/// <reference types="cypress" />

describe('DemoQA Alerts', () => {
  beforeEach(() => {
    cy.visit('/alerts');
  });

  it('should handle the first alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('#alertButton').click();

    cy.get('@alertStub').should('have.been.calledWith', 'You clicked a button');
  });

  it('should handle the second delayed alert', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('#timerAlertButton').click();

    cy.get('@alertStub', { timeout: 6000 }).should(
      'have.been.calledWith',
      'This alert appeared after 5 seconds'
    );
  });

  it('should handle confirm alert with OK', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');

      return true;
    });

    cy.get('#confirmButton').click();

    cy.get('#confirmResult')
      .should('be.visible')
      .and('have.text', 'You selected Ok');
  });

  it('should handle confirm alert with Cancel', () => {
    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Do you confirm action?');

      return false;
    });

    cy.get('#confirmButton').click();

    cy.get('#confirmResult')
      .should('be.visible')
      .and('have.text', 'You selected Cancel');
  });

  it('should handle prompt alert', () => {
    const name = 'Vital';

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns(name);
    });

    cy.get('#promtButton').click();

    cy.get('#promptResult').should('be.visible').and('contain.text', name);
  });
});
