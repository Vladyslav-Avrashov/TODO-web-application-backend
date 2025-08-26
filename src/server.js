import express from 'express';
import cors from 'cors';
import tasksRouter from './routers/tasks.js';
// import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/tasks', tasksRouter);
  // app.use('/api-docs', swaggerDocs());
  app.use(errorHandler);
  app.get(notFoundHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
