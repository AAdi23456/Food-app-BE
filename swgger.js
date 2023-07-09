const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Name',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    basePath: '/',
  },
  apis: [path.resolve(__dirname, './routes', '*.js')], // Replace 'routes' with the directory name of your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
