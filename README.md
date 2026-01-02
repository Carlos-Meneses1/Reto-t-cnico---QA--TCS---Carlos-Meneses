# PRUEBA TECNICA PARA QA - AUTOMATIZACIÓN CON CYPRESS

Pruebas E2E y API para https://www.demoblaze.com/

================================================================================

## REQUISITOS PREVIOS:

1. Node.js versión 16 o superior instalado
   
   Verificar con: `node --version`
   
   Descargar desde: https://nodejs.org/

2. npm (viene con Node.js)
   
   Verificar con: `npm --version`

3. Navegador Google Chrome instalado (recomendado)

---

## ESTRUCTURA DEL PROYECTO:

```
examen-qa-demoblaze/
├── cypress/
│   ├── e2e/
│   │   ├── purchase-flow.cy.js    -> Ejercicio 1: Pruebas E2E
│   │   └── api-tests.cy.js        -> Ejercicio 2: Pruebas de API
│   ├── fixtures/
│   │   └── test-data.json         -> Datos de prueba
│   ├── support/
│   │   ├── commands.js            -> Comandos personalizados
│   │   └── e2e.js                 -> Configuración de soporte
│   ├── videos/                    -> Videos de ejecución (generados)
│   ├── screenshots/               -> Capturas de error (generadas)
│   └── reports/                   -> Reportes HTML (generados)
├── cypress.config.js              -> Configuración principal
├── package.json                   -> Dependencias y scripts
├── README.md                      -> Este archivo
└── conclusiones.txt               -> Hallazgos y conclusiones
```

---

## INSTRUCCIONES DE INSTALACIÓN:

### PASO 1: Extraer el archivo ZIP
- Descomprimir el archivo en una carpeta de su elección
- Abrir una terminal (CMD, PowerShell, o Terminal de Visual Studio Code - Recomendado)

### PASO 2: Navegar a la carpeta del proyecto
```bash
cd ruta/a/examen-qa-demoblaze
```

### PASO 3: Instalar las dependencias
```bash
npm install
```
(Esto instalará Cypress y todas las dependencias necesarias)
(Puede tomar varios minutos la primera vez)

### PASO 4: Instalar el binario de Cypress (IMPORTANTE)
```bash
npx cypress install
```
(Esto descarga el ejecutable de Cypress - puede tomar 3-5 minutos)

### PASO 5: Verificar la instalación
```bash
npx cypress verify
```
(Debe mostrar: "Verified Cypress!")

---

## INSTRUCCIONES DE EJECUCIÓN:


### Video de Ejecución de Tests

## DEMOSTRACIÓN

Haz clic en el enlace para ver la demostración completa:

**[▶️ Ver video completo](https://drive.google.com/file/d/1_3igMcFF6k_yQWMA5uQoCaXYEN2uGvlW/view?usp=drive_link**

> **Nota:** Este video es privado y estará disponible hasta su revisión.

RECOMENDACION: EJECUTAR PASO 1 - PASO 2 Y PASO 7

### OPCIÓN 1: EJECUTAR TODAS LAS PRUEBAS (Modo Headless)

Este modo ejecuta todas las pruebas en segundo plano sin abrir el navegador.
Genera videos y reportes automáticamente.

**Comando:**
```bash
npm test
```

**Resultado:**
- Las pruebas se ejecutan en segundo plano
- Se generan videos en: cypress/videos/
- Se generan reportes en: cypress/reports/
- Los resultados aparecen en la consola

---

### OPCIÓN 2: EJECUTAR PRUEBAS CON NAVEGADOR VISIBLE

Este modo permite ver cómo se ejecutan las pruebas en tiempo real.

**Comando:**
```bash
npm run test:headed
```

**Resultado:**
- Se abre el navegador y se puede ver la ejecución
- Útil para debugging y entender el flujo

---

### OPCIÓN 3: EJECUTAR SOLO PRUEBAS E2E (Ejercicio 1)

Ejecuta únicamente las pruebas del flujo de compra.

**Comando:**
```bash
npm run test:e2e
```

**Resultado:**
- Solo ejecuta: purchase-flow.cy.js
- Incluye 3 test cases del flujo E2E

---

### OPCIÓN 4: EJECUTAR SOLO PRUEBAS DE API (Ejercicio 2)

Ejecuta únicamente las pruebas de los endpoints de API.

**Comando:**
```bash
npm run test:api
```

**Resultado:**
- Solo ejecuta: api-tests.cy.js
- Incluye 8 test cases de API (signup y login)

---

### OPCIÓN 5: ABRIR CYPRESS EN MODO INTERACTIVO 

Este es el modo más visual e interactivo de Cypres pero no se recomienda tanto para que usuarios externos corran los test
porque suele dar errores relacionados con cache por eso es recomendado mas para desarrolladores.

**Comando:**
```bash
npm run open
```

**Pasos:**
1. Se abre la interfaz de Cypress
2. Seleccionar "E2E Testing"
3. Elegir el navegador (Chrome recomendado)
4. Click en "Start E2E Testing"
5. Seleccionar el archivo de prueba que desea ejecutar:
   - purchase-flow.cy.js (Ejercicio 1)
   - api-tests.cy.js (Ejercicio 2)
6. Las pruebas se ejecutan y se pueden ver en tiempo real
7. Cada paso se puede inspeccionar haciendo click

---

### OPCIÓN 6: EJECUTAR EN DIFERENTES NAVEGADORES

**Comando Chrome:**
```bash
npm run test:chrome
```

**Comando Firefox:**
```bash
npm run test:firefox
```

**Comando Edge:**
```bash
npm run test:edge
```

---

### OPCIÓN 7: GENERAR REPORTE HTML COMPLETO

Genera un reporte HTML bonito con gráficos y estadísticas.

**Comando:**
```bash
npm run report:full
```

**Resultado:**
- Ejecuta todas las pruebas
- Genera reporte HTML en: cypress/reports/html/index.html
- Abrir el archivo index.html en un navegador para ver el reporte

---
## DETALLES DE LOS TESTS:

### EJERCICIO 1 - PRUEBAS E2E (purchase-flow.cy.js):

Test Cases incluidos:

- TC001 - Flujo completo de compra exitoso
- Pasos automatizados:
  - Accede a la página principal de DemoBlaze.
  - Selecciona el producto Samsung Galaxy S6 y lo agrega al carrito.
  - Regresa al Home y agrega el producto Nokia Lumia 1520.
  - Navega al carrito de compras.
  - Verifica que ambos productos estén presentes en el carrito.
  - Valida que el total de la compra sea mayor a cero.
  - Inicia el proceso de compra mediante el botón Place Order.
  - Completa el formulario de compra con datos válidos.
  - Confirma la compra.

- TC002 - Validación de cálculo del total
- Pasos automatizados:
  - Agrega dos productos diferentes al carrito.
  - Accede a la vista del carrito.
  - Obtiene dinámicamente los precios de cada producto.
  - Calcula el total esperado.
  - Compara el total calculado con el total mostrado en la interfaz.

- TC003 - Eliminar productos del carrito
- Pasos automatizados:
  - Agrega dos productos al carrito.
  - Accede al carrito de compras.
  - Verifica que existan dos productos.
  - Elimina uno de los productos.
  - Verifica que el carrito se actualice.
---

### EJERCICIO 2 - PRUEBAS DE API (api-tests.cy.js):

Test Cases incluidos:
- TC-API-001 - Crear nuevo usuario (signup exitoso)
- TC-API-002 - Intentar crear usuario duplicado
- TC-API-003 - Validar campos requeridos en signup
- TC-API-004 - Login con credenciales correctas
- TC-API-005 - Login con credenciales incorrectas
- TC-API-006 - Password incorrecto con usuario existente
- TC-API-007 - Validar estructura de respuesta
- TC-API-008 - Verificar seguridad (passwords no expuestas)

---

## CARACTERÍSTICAS IMPLEMENTADAS:

- Page Object Model (comandos personalizados)
- Data-Driven Testing (uso de fixtures)
- Hooks (before, beforeEach, after, afterEach)
- Reportes HTML con mochawesome
- Screenshots en caso de fallos
- Videos de ejecución
- Logging detallado de requests/responses
- Validaciones exhaustivas
- Códigos comentados y explicados

---

## TROUBLESHOOTING (Solución de problemas):

### Problema: "npm: command not found"
**Solución:** Instalar Node.js desde https://nodejs.org/

### Problema: Las pruebas fallan por timeout
**Solución:** Verificar conexión a internet. El sitio demoblaze.com debe estar accesible.

### Problema: "Cypress verification timed out"
**Solución:** Ejecutar: `npx cypress verify`

### Problema: No se genera el reporte HTML
**Solución:**
1. Ejecutar: `npm run test`
2. Ejecutar: `npm run report:merge`
3. Ejecutar: `npm run report:generate`

### Problema: Las pruebas E2E fallan porque los productos no se encuentran
**Solución:** El sitio puede haber cambiado. Verificar que los productos "Samsung galaxy s6" y "Nokia lumia 1520" existen en demoblaze.com

### Problema: PASO 5 [10024:0101/190119.880:ERROR:bad_message.cc(29)] Terminating renderer for bad IPC message, reason 114
1. Ejecutar: `npx cypress verify`
2. Copiar y Abrir la direccion en una carpeta que nos da en la verificacion: ✔  Verified Cypress! ---> C:\Users\pc\AppData\Local\Cypress\Cache\13.17.0\Cypress 
3. Borrar todo el contenido de la carpeta
4. Eliminar la carpeta de node_modules del proyecto
5. Instalar desde el inicio
### Problema: Correr el comando npm run open no se abre en algunas computadoras por cache o compatibilidad de la misma
---

## NOTAS IMPORTANTES:

1. La primera ejecución puede tardar más porque Cypress descarga binarios
2. Los videos ocupan espacio. Se pueden desactivar en cypress.config.js
3. Cada ejecución de las pruebas API crea un usuario nuevo con timestamp
4. Los tests son independientes y pueden ejecutarse en cualquier orden
5. Se recomienda usar "npm run open" para ver las pruebas en acción

---

## ARCHIVOS GENERADOS DESPUÉS DE LA EJECUCIÓN:

- cypress/videos/*.mp4                    -> Videos de ejecución
- cypress/screenshots/*.png               -> Capturas de fallos
- cypress/reports/*.json                  -> Reportes en JSON
- cypress/reports/html/index.html         -> Reporte HTML visual

---

## COMANDOS RÁPIDOS DE REFERENCIA:

```bash
npm install              # Instalar dependencias
npm test                 # Ejecutar todas las pruebas
npm run test:headed      # Abrir Cypress en el navegador para ver visualmente el proceso
npm run test:e2e         # Solo pruebas E2E
npm run test:api         # Solo pruebas API
npm run report:full      # Generar reporte HTML
```

