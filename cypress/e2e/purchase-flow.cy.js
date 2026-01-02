/**
 * EJERCICIO 1 - PRUEBA E2E
 * Prueba automatizada del flujo completo de compra en DemoBlaze
 * 
 * Flujo:
 * 1. Agregar dos productos al carrito
 * 2. Visualizar el carrito
 * 3. Completar el formulario de compra
 * 4. Finalizar la compra
 */

describe('Flujo E2E - Proceso de Compra en DemoBlaze', () => {
  
  const purchaseData = {
    name: "Carlos Meneses",
    country: "Ecuador",
    city: "Quito",
    creditCard: "4532123456789012",
    month: "12",
    year: "2025"
  };
  
  const product1 = "Samsung galaxy s6";
  const product2 = "Nokia lumia 1520";

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
    cy.wait(3000);
  });

  it('TC001 - Debe completar el flujo de compra exitosamente', () => {
    
    // Agregar primer producto
    cy.contains('a', product1, { timeout: 10000 }).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    
    // Volver al home
    cy.visit('https://www.demoblaze.com/');
    cy.wait(3000);
    
    // Agregar segundo producto
    cy.contains('a', product2, { timeout: 10000 }).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    
    // Ir al carrito
    cy.visit('https://www.demoblaze.com/cart.html');
    cy.wait(4000);
    
    // Verificar productos
    cy.get('tbody#tbodyid tr', { timeout: 10000 }).should('have.length.at.least', 2);
    cy.get('tbody#tbodyid').should('contain', product1);
    cy.get('tbody#tbodyid').should('contain', product2);
    
    // Verificar total
    cy.get('#totalp').invoke('text').then((total) => {
      expect(parseFloat(total)).to.be.greaterThan(0);
    });
    
    // Place Order
    cy.contains('button', 'Place Order').click();
    cy.wait(2000);
    
    // Completar formulario
    cy.get('#name', { timeout: 10000 }).type(purchaseData.name);
    cy.get('#country').type(purchaseData.country);
    cy.get('#city').type(purchaseData.city);
    cy.get('#card').type(purchaseData.creditCard);
    cy.get('#month').type(purchaseData.month);
    cy.get('#year').type(purchaseData.year);
    cy.wait(1000);
    
    // Confirmar compra
    cy.get('#orderModal').find('button').contains('Purchase').click();
    cy.wait(2000);
    
    // Verificar confirmacion
    cy.get('.sweet-alert', { timeout: 10000 }).should('be.visible');
    cy.get('.sweet-alert h2').should('contain', 'Thank you for your purchase!');
    cy.get('.sweet-alert .lead').invoke('text').then((text) => {
      expect(text).to.contain(purchaseData.name);
    });
    
    cy.contains('button', 'OK').click();
  });

  it('TC002 - Debe validar que el carrito muestra el total correcto', () => {
    
    // Agregar productos
    cy.contains('a', product1).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    cy.visit('https://www.demoblaze.com/');
    cy.wait(3000);
    
    cy.contains('a', product2).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    
    // Ir al carrito
    cy.visit('https://www.demoblaze.com/cart.html');
    cy.wait(4000);
    
    // Calcular total
    let expectedTotal = 0;
    cy.get('tbody#tbodyid tr td:nth-child(3)').each(($el) => {
      expectedTotal += parseFloat($el.text());
    }).then(() => {
      cy.get('#totalp').invoke('text').then((total) => {
        expect(parseFloat(total)).to.equal(expectedTotal);
      });
    });
  });

  it('TC003 - Debe permitir eliminar productos del carrito', () => {
    
    // Agregar productos
    cy.contains('a', product1).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    cy.visit('https://www.demoblaze.com/');
    cy.wait(3000);
    
    cy.contains('a', product2).click();
    cy.wait(2000);
    cy.contains('a', 'Add to cart').click();
    cy.wait(2000);
    
    // Ir al carrito
    cy.visit('https://www.demoblaze.com/cart.html');
    cy.wait(4000);
    
    // Verificar 2 productos
    cy.get('tbody#tbodyid tr').should('have.length', 2);
    
    // Eliminar uno
    cy.get('tbody#tbodyid tr').first().find('a').click();
    cy.wait(2000);
    
    // Verificar que queda 1
    cy.get('tbody#tbodyid tr').should('have.length', 1);
  });

}); 



