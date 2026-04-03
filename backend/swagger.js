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
// Pointing it to app.js allows the crawler to traverse all router configurations
const routes = ['./app.js'];

// Generate documentation
swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);
