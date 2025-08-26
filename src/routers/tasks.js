import { Router } from 'express';
import {
  getTaskByIdController,
  getTasksController,
  addTaskController,
  patchTaskByIdController,
  deleteTaskByIdController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { taskAddSchema, taskUpdateSchema } from '../validation/tasks.js';
import { isValidId } from '../middlewares/isValidId.js';

const tasksRouter = Router();

tasksRouter.get('/', ctrlWrapper(getTasksController));

tasksRouter.get('/:taskId', isValidId, ctrlWrapper(getTaskByIdController));

tasksRouter.post(
  '/',
  validateBody(taskAddSchema),
  ctrlWrapper(addTaskController),
);

tasksRouter.patch(
  '/:taskId',
  isValidId,
  validateBody(taskUpdateSchema),
  ctrlWrapper(patchTaskByIdController),
);

tasksRouter.delete(
  '/:taskId',
  isValidId,
  ctrlWrapper(deleteTaskByIdController),
);

export default tasksRouter;
