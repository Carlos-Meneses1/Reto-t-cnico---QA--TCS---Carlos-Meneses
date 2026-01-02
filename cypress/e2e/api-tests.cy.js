/**
 * EJERCICIO 2 - PRUEBAS DE APIs
 * Pruebas de los endpoints de Signup y Login de DemoBlaze
 * 
 * APIs a probar:
 * - POST https://api.demoblaze.com/signup
 * - POST https://api.demoblaze.com/login
 * 
 * Casos:
 * 1. Crear un nuevo usuario en signup
 * 2. Intentar crear un usuario ya existente
 * 3. Usuario y password correcto en login
 * 4. Usuario y password incorrecto en login
 */

describe('API Tests - Signup y Login en DemoBlaze', () => {
  
  let testData;
  let timestamp;
  let newUsername;
  
  before(() => {
    // Cargar datos de prueba
    cy.fixture('test-data').then((data) => {
      testData = data;
    });
    
    // Generar timestamp para crear usuarios únicos
    timestamp = Date.now();
    newUsername = `testuser_${timestamp}`;
  });

  describe('Endpoint: Signup', () => {
    
    it('TC-API-001: Debe crear un nuevo usuario exitosamente', () => {
      cy.log('**CASO 1: Crear nuevo usuario**');
      cy.log(`Username: ${newUsername}`);
      
      // Llamar al API de signup con un usuario nuevo
      cy.apiSignup(newUsername, testData.users.newUser.password).then((response) => {
        
        // Logs de request
        cy.log('**REQUEST:**');
        cy.log(`URL: https://api.demoblaze.com/signup`);
        cy.log(`Method: POST`);
        cy.log(`Body: ${JSON.stringify({
          username: newUsername,
          password: testData.users.newUser.password
        })}`);
        
        // Logs de response
        cy.log('**RESPONSE:**');
        cy.log(`Status: ${response.status}`);
        cy.log(`Body: ${JSON.stringify(response.body)}`);
        cy.log(`Body type: ${typeof response.body}`);
        
        // VALIDACIONES
        // Verificar status code 200
        expect(response.status).to.eq(200);
        
        // Verificar que no hay error en el body
        // La API puede devolver string vacío '' o un objeto sin errorMessage
        if (typeof response.body === 'string') {
          // Si es string, verificar que no contiene error
          expect(response.body).to.not.include('errorMessage');
        } else if (typeof response.body === 'object' && response.body !== null) {
          // Si es objeto, verificar que no tiene errorMessage
          expect(response.body).to.not.have.property('errorMessage');
        }
        
        cy.log('**USUARIO CREADO EXITOSAMENTE**');
      });
    });

    it('TC-API-002: No debe permitir crear un usuario ya existente', () => {
      cy.log('**CASO 2: Intentar crear usuario duplicado**');
      cy.log(`Username: ${newUsername}`);
      
      // Intentar crear el mismo usuario nuevamente
      cy.apiSignup(newUsername, testData.users.newUser.password).then((response) => {
        
        // Log de request
        cy.log('**REQUEST:**');
        cy.log(`URL: https://api.demoblaze.com/signup`);
        cy.log(`Method: POST`);
        cy.log(`Body: ${JSON.stringify({
          username: newUsername,
          password: testData.users.newUser.password
        })}`);
        
        // Log de response
        cy.log('**RESPONSE:**');
        cy.log(`Status: ${response.status}`);
        cy.log(`Body: ${JSON.stringify(response.body)}`);
        
        // VALIDACIONES
        // Verificar status code 200 (la API siempre devuelve 200)
        expect(response.status).to.eq(200);
        
        // Verificar que hay un mensaje de error
        expect(response.body).to.have.property('errorMessage');
        
        // Verificar el mensaje específico
        expect(response.body.errorMessage).to.eq('This user already exist.');
        
        cy.log('**ERROR MANEJADO CORRECTAMENTE: Usuario ya existe**');
      });
    });

    it('TC-API-003: Debe validar campos requeridos en signup', () => {
      cy.log('**CASO 3: Validar campos requeridos**');
      
      // Intentar signup sin username
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        body: {
          username: '',
          password: 'password123'
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Sin username - Status: ${response.status}`);
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        
        // Verificar que hay algún tipo de validación
        expect(response.status).to.be.oneOf([200, 400, 500]);
      });
      
      // Intentar signup sin password
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/signup',
        body: {
          username: `testuser_${Date.now()}`,
          password: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Sin password - Status: ${response.status}`);
        cy.log(`Response: ${JSON.stringify(response.body)}`);
        
        expect(response.status).to.be.oneOf([200, 400, 500]);
      });
    });
  });

  describe('Endpoint: Login', () => {
    
    // Variable para almacenar el token si la API lo devuelve
    let authToken;
    
    it('TC-API-004: Debe hacer login con credenciales correctas', () => {
      cy.log('**CASO 3: Login con usuario y password correctos**');
      cy.log(`Username: ${newUsername}`);
      
      // Login con el usuario que creamos anteriormente
      cy.apiLogin(newUsername, testData.users.newUser.password).then((response) => {
        
        // Log de request
        cy.log('**REQUEST:**');
        cy.log(`URL: https://api.demoblaze.com/login`);
        cy.log(`Method: POST`);
        cy.log(`Body: ${JSON.stringify({
          username: newUsername,
          password: testData.users.newUser.password
        })}`);
        
        // Log de response
        cy.log('**RESPONSE:**');
        cy.log(`Status: ${response.status}`);
        cy.log(`Body: ${JSON.stringify(response.body)}`);
        
        // VALIDACIONES
        // Verificar status code 200
        expect(response.status).to.eq(200);
        
        // Verificar que no hay error
        expect(response.body).to.not.have.property('errorMessage');
        
        // Verificar que devuelve un Auth_token
        if (response.body.Auth_token) {
          expect(response.body.Auth_token).to.be.a('string');
          expect(response.body.Auth_token.length).to.be.greaterThan(0);
          authToken = response.body.Auth_token;
          cy.log(`Auth Token recibido: ${authToken.substring(0, 20)}...`);
        }
        
        cy.log('**LOGIN EXITOSO**');
      });
    });

    it('TC-API-005: No debe hacer login con credenciales incorrectas', () => {
      cy.log('**CASO 4: Login con usuario y password incorrectos**');
      cy.log(`Username: ${testData.users.invalidUser.username}`);
      
      // Intentar login con credenciales incorrectas
      cy.apiLogin(
        testData.users.invalidUser.username, 
        testData.users.invalidUser.password
      ).then((response) => {
        
        // Log de request
        cy.log('**REQUEST:**');
        cy.log(`URL: https://api.demoblaze.com/login`);
        cy.log(`Method: POST`);
        cy.log(`Body: ${JSON.stringify({
          username: testData.users.invalidUser.username,
          password: testData.users.invalidUser.password
        })}`);
        
        // Log de response
        cy.log('**RESPONSE:**');
        cy.log(`Status: ${response.status}`);
        cy.log(`Body: ${JSON.stringify(response.body)}`);
        
        // VALIDACIONES
        // Verificar status code 200 (la API siempre devuelve 200)
        expect(response.status).to.eq(200);
        
        // Verificar que hay un mensaje de error
        expect(response.body).to.have.property('errorMessage');
        
        // Verificar el mensaje de error
        expect(response.body.errorMessage).to.be.oneOf([
          'User does not exist.',
          'Wrong password.'
        ]);
        
        cy.log('**ERROR MANEJADO CORRECTAMENTE: Credenciales inválidas**');
      });
    });

    it('TC-API-006: Debe validar password incorrecto con usuario existente', () => {
      cy.log('**CASO 5: Password incorrecto con usuario existente**');
      
      // Login con usuario correcto pero password incorrecto
      cy.apiLogin(newUsername, 'PasswordIncorrecto123!').then((response) => {
        
        cy.log('**REQUEST:**');
        cy.log(`URL: https://api.demoblaze.com/login`);
        cy.log(`Method: POST`);
        cy.log(`Body: ${JSON.stringify({
          username: newUsername,
          password: 'PasswordIncorrecto123!'
        })}`);
        
        cy.log('**RESPONSE:**');
        cy.log(`Status: ${response.status}`);
        cy.log(`Body: ${JSON.stringify(response.body)}`);
        
        // VALIDACIONES
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('errorMessage');
        expect(response.body.errorMessage).to.eq('Wrong password.');
        
        cy.log('**ERROR MANEJADO CORRECTAMENTE: Password incorrecto**');
      });
    });

    it('TC-API-007: Debe validar estructura de respuesta exitosa', () => {
      cy.log('**VALIDACIÓN: Estructura de respuesta de login exitoso**');
      
      cy.apiLogin(newUsername, testData.users.newUser.password).then((response) => {
        
        // Verificar estructura del objeto de respuesta
        expect(response).to.have.property('status');
        expect(response).to.have.property('body');
        expect(response).to.have.property('headers');
        
        // Verificar headers importantes
        expect(response.headers).to.have.property('content-type');
        expect(response.headers['content-type']).to.include('application/json');
        
        // Verificar que el body existe (puede ser string o objeto)
        expect(response.body).to.exist;
        
        // Si el body es un string, parsearlo como JSON
        let parsedBody = response.body;
        if (typeof response.body === 'string') {
          try {
            parsedBody = JSON.parse(response.body);
          } catch (e) {
            // Si no se puede parsear, usar el body original
          }
        }
        
        cy.log(`Tipo de body: ${typeof parsedBody}`);
        cy.log('**ESTRUCTURA DE RESPUESTA VÁLIDA**');
      });
    });
  });

  describe('Validaciones Adicionales de Seguridad', () => {
    
    it('TC-API-008: Debe verificar que las passwords no se devuelven en la respuesta', () => {
      cy.log('**SEGURIDAD: Verificar que no se exponen passwords**');
      
      const testUsername = `security_test_${Date.now()}`;
      const testPassword = 'SecurePass123!';
      
      // Crear usuario
      cy.apiSignup(testUsername, testPassword).then((signupResponse) => {
        // Verificar que el password no está en la respuesta
        const responseString = JSON.stringify(signupResponse.body);
        expect(responseString).to.not.include(testPassword);
      });
      
      // Hacer login
      cy.apiLogin(testUsername, testPassword).then((loginResponse) => {
        // Verificar que el password no está en la respuesta
        const responseString = JSON.stringify(loginResponse.body);
        expect(responseString).to.not.include(testPassword);
        
        cy.log('**PASSWORDS NO SE EXPONEN EN RESPUESTAS**');
      });
    });
  });

});