const swaggerAutogen = require('swagger-autogen')();

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:9000',
        basePath: '/',
        schemes: 'https',
    },
    apis: ['./routes/*/*.js', './swagger/*'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, options);
