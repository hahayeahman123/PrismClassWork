import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ads API service',
            version: '0.0.1'
        },
        components:{
            securitySchemes:{
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerformat: 'JWT'
                }
            }
        },
        security: [{bearerAuth: []}]
    },
    apis: ['routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app)=>{
    app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

