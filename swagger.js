// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Node.js API',
      version: '1.0.0',
      description: 'Documentation for my Node.js API',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJSDoc(options);

module.exports = { specs, swaggerUi };

