const app = require('express')();

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const YAML = require('js-yaml');
const OpenApiValidator = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');

const config = require('./config/config');

const swaggerDocument = YAML.load(fs.readFileSync(path.join(__dirname, 'swagger', 'swagger.yaml')), 'utf-8');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    operationHandlers: path.join(__dirname, 'controllers'),
  }),
);

const { PORT } = config;

app.listen(PORT, () => logger.info({ message: `[TYPEBOT] Server listening on port ${PORT}` }));
