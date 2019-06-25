const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'NTASK API',
      version: '1.0.0',
      description: 'API documentation to backend of NTASK',
      contact: {
        email: 'brunohafonso@gmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
