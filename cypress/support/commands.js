// ***********************************************
// Reutilizables para pruebas
// ***********************************************

/**
 * Comando para agregar un producto al carrito
 * @param {string} productName - Nombre del producto
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  // Hacer clic en el enlace del producto
  cy.contains('a.hrefch', productName).click();
  
  // Esperar a que se cargue la página del producto
  cy.get('.name').should('contain', productName);
  
  // Esperar un momento adicional para asegurar que todo está cargado
  cy.wait(1000);
  
  // Hacer clic en "Add to cart"
  cy.contains('a', 'Add to cart').click();
  
  // Manejar la alerta de confirmación
  cy.on('window:alert', (text) => {
    expect(text).to.contains('Product added');
  });
  
  // Esperar a que se procese la alerta
  cy.wait(2000);
  
  // Volver al home para agregar otro producto
  // Usar el logo o navegar directamente a la URL base
  cy.visit('/');
  cy.wait(2000);
});

/**
 * Comando para ir al carrito y verificar productos
 */
Cypress.Commands.add('goToCart', () => {
  cy.get('#cartur').click();
  cy.url().should('include', 'cart.html');
  cy.wait(2000); // Esperar a que cargue el carrito
});

/**
 * Comando para completar el formulario de compra
 * @param {object} data - Datos del formulario
 */
Cypress.Commands.add('fillPurchaseForm', (data) => {
  cy.get('#name').clear().type(data.name);
  cy.get('#country').clear().type(data.country);
  cy.get('#city').clear().type(data.city);
  cy.get('#card').clear().type(data.creditCard);
  cy.get('#month').clear().type(data.month);
  cy.get('#year').clear().type(data.year);
});

/**
 *lamar API de signup
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('apiSignup', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/signup',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  });
});

/**
 * llamar API de login
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('apiLogin', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://api.demoblaze.com/login',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  });
});