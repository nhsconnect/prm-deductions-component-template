import express from 'express';
import httpContext from 'express-http-context';
import { errorLogger, logger as requestLogger } from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import example from './api/example';
import authenticatedExample from './api/example-authenticated';
import health from './api/health';
import { options } from './config/logging';
import swaggerDocument from './swagger.json';
import { authenticateRequest } from './middleware/auth';

// Express app
const app = express();

// User defined routers
app.use('/health', health);
app.use('/example', example);
app.use('/example-authenticated', authenticateRequest, authenticatedExample);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Loggers and context
app.use(httpContext.middleware);
app.use(requestLogger(options));
app.use(errorLogger(options));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

export default app;
