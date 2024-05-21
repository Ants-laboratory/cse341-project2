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
    components: {
      schemas: {
        Contact: {
          type: 'object',
          required: ['username', 'password', 'email', 'characters', 'vip'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the contact',
            },
            username: {
              type: 'string',
              description: 'The username of the contact',
            },
            password: {
              type: 'string',
              description: 'The password of the contact',
            },
            email: {
              type: 'string',
              description: 'The email of the contact',
            },
            characters: {
              type: 'number',
              description: 'The number of characters',
            },
            vip: {
              type: 'string',
              description: 'The VIP status of the contact',
            },
          },
          example: {
            
            username: 'yourusername',
            password: 'yourpassword',
            email: 'youremail@example.com',
            characters: 2,
            vip: 'yes',
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJSDoc(options);

module.exports = { specs, swaggerUi };
