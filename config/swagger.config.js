import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'BRUSHWORK',
            version: '1.0.0',
            description: 'UMC-Project-BRUSHWORK API Endpoint: https://dev.brushwork.shop/',
        },
        servers: [
            {
                url: 'https://dev.brushwork.shop',
                description: "API 서버"
            },
            {
                url: 'http://localhost:3000',
                description: "로컬호스트"
            }
        ],
    },
    apis: ['./swagger/*', './src/swagger/*']
};

export const specs = SwaggerJsdoc(options);