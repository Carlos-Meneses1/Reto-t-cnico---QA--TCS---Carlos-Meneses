const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL base del sitio a probar
    baseUrl: 'https://www.demoblaze.com',
    
    // Configuración de viewport
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Tiempos de espera
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Configuración de video y screenshots
    video: true,
    screenshotOnRunFailure: true,
    
    // Configuración de reportes
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportTitle: 'Reporte de Pruebas - DemoBlaze',
      reportPageTitle: 'Resultados de Pruebas QA'
    },
    
    setupNodeEvents(on, config) {
      return config;
    },
  },
});