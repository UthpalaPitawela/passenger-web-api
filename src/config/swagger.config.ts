import { Options } from 'swagger-jsdoc';

export const swaggerConfig: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Passenger API',
      version: '1.0.0',
      description: `
        A comprehensive API for managing passenger information and flight bookings.
        
        ## Features
        - Get passengers by flight number and departure date
        - Get detailed passenger information by ID
        - Full flight information associated with passengers
        
        ## Authentication
        Currently, this API does not require authentication, but this may change in future versions.
        
        ## Rate Limiting
        Please be respectful with API calls. Rate limiting may be implemented in the future.
      `,
      contact: {
        name: 'API Support',
        email: 'support@passenger-api.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Passengers',
        description: 'Operations related to passenger management',
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

export const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 10px; }
  `,
  customSiteTitle: 'Passenger API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestHeaders: false,
  },
};
