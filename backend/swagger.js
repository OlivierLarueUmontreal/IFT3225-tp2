import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'IFT3225-tp2 API',
    description: 'API testing and documentation interface'
  },
  host: 'localhost:6767',
  components: {
      securitySchemes: {
          cookieAuth: {
              type: 'apiKey',
              in: 'cookie',
              name: 'token'
          }
      }
  }
};

const outputFile = './swagger_output.json';
const routes = ['./app.js'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);
