import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'BRUSHWORK',
        description: 'UMC-Project-BRUSHWORK API'
    },
    host: 'dev.brushwork.shop'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen()(outputFile, routes, doc);