const nodeExternals = require("webpack-node-externals");
const SwaggerJSDocWebpackPlugin = require('swagger-jsdoc-webpack-plugin');
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    context: __dirname + '/src',
    entry: {
        app: '../index.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    plugins: [
        new SwaggerJSDocWebpackPlugin({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: 'BRUSHWORK',
                    version: '1.0.0',
                    description: 'UMC-Project-BRUSHWORK API'
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
            apis: ['./src/routes/*.js', './src/swagger/*']        
        }),
    ],
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        },
        ],
    },
    target: "node",
    externalsPresets: {
        node: true,
    },
    externals: [nodeExternals()],
    };