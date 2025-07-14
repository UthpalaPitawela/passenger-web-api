import swaggerJSDoc from 'swagger-jsdoc';

const swaggerConfig: swaggerJSDoc.Options = {
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
    components: {
      schemas: {
        Passenger: {
          type: 'object',
          properties: {
            passengerId: {
              type: 'string',
              description: 'Unique identifier for the passenger',
              example: 'PASS123',
            },
            firstName: {
              type: 'string',
              description: 'First name of the passenger',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the passenger',
              example: 'Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the passenger',
              example: 'john.doe@example.com',
            },
            bookingId: {
              type: 'string',
              description: 'Booking ID associated with the passenger',
              example: 'BOOK456',
            },
            flights: {
              type: 'array',
              description: 'List of flights associated with the passenger',
              items: {
                $ref: '#/components/schemas/Flight',
              },
            },
          },
        },
        Flight: {
          type: 'object',
          properties: {
            flightNumber: {
              type: 'string',
              description: 'Flight number',
              example: 'FL123',
            },
            departureAirport: {
              type: 'string',
              description: 'Departure airport code',
              example: 'JFK',
            },
            arrivalAirport: {
              type: 'string',
              description: 'Arrival airport code',
              example: 'LAX',
            },
            departureDate: {
              type: 'string',
              format: 'date-time',
              description: 'Departure date and time',
              example: '2024-12-25T10:30:00Z',
            },
            arrivalDate: {
              type: 'string',
              format: 'date-time',
              description: 'Arrival date and time',
              example: '2024-12-25T14:45:00Z',
            },
          },
        },
        PassengerByFlight: {
          type: 'object',
          properties: {
            passengerId: {
              type: 'string',
              description: 'Unique identifier for the passenger',
              example: 'PASS123',
            },
            firstName: {
              type: 'string',
              description: 'First name of the passenger',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Last name of the passenger',
              example: 'Doe',
            },
            bookingId: {
              type: 'string',
              description: 'Booking ID associated with the passenger',
              example: 'BOOK456',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Resource not found',
            },
            statusCode: {
              type: 'integer',
              description: 'HTTP status code',
              example: 404,
            },
          },
        },
      },
    },
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerConfig);

export default swaggerSpec;
