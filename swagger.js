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
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['username', 'password', 'email', 'characters', 'vip'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
            characters: { type: 'number' },
            vip: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

module.exports = { specs, swaggerUi };
