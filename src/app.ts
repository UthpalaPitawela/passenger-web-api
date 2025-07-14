import express from 'express';
import routes from './routes';
import YAML from 'yamljs';
import path from 'path';
import swaggerSpec from './utils/swagger';

import errorHandler from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';

// Load the static YAML swagger document
const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yml'));

const app = express();

app.use(express.json());

// Swagger UI setup - must come BEFORE the /api routes
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Passenger API Documentation',
}));

app.use('/api-docs-jsdoc', swaggerUi.serve);
app.get('/api-docs-jsdoc', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Passenger API Documentation (JSDoc)',
}));

// API routes
app.use('/api', routes);

// JSON spec endpoints
app.get('/api/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api/swagger-yaml.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

app.use(errorHandler);
export default app;
