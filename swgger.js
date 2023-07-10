const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    basePath: '/',
  },
  apis: ['./CRUDop.js'], // Replace with the path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
