// ***********************************************************
// Este archivo se procesa y carga automáticamente antes de
// los archivos de test.
// ***********************************************************

// Importar comandos personalizados
import './commands';

// Configuración global de Cypress

// Desactivar el manejo de excepciones no capturadas
// Esto previene que tests fallen por errores de JavaScript de la aplicación
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false previene que Cypress falle el test
  // Usar con precaución - solo para errores conocidos de la aplicación
  console.log('Excepción no capturada:', err.message);
  return false;
});

// Configurar comportamiento de logs
beforeEach(() => {
  cy.log('=================================');
  cy.log(`Iniciando test: ${Cypress.currentTest.title}`);
  cy.log('=================================');
});

afterEach(() => {
  cy.log('=================================');
  cy.log(`Test finalizado: ${Cypress.currentTest.title}`);
  cy.log('=================================');
}); 