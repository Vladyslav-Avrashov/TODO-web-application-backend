import createHttpError from 'http-errors';
import {
  getTasks,
  addTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from '../services/tasks.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { tasksSortFields } from '../db/models/Task.js';
import { parseTaskFilters } from '../utils/parseTaskFilters.js';

export const getTasksController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, tasksSortFields);
  const filters = parseTaskFilters(req.query);
  const data = await getTasks({ page, perPage, sortBy, sortOrder, filters });

  res.json({
    status: 200,
    message: 'Successfully found tasks!',
    data,
  });
};

export const addTaskController = async (req, res) => {
  const data = await addTask(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a task!',
    data,
  });
};

export const getTaskByIdController = async (req, res) => {
  const { taskId } = req.params;
  const data = await getTaskById(taskId);

  if (!data) throw createHttpError(404, 'Task not found');

  res.json({
    status: 200,
    message: `Successfully found task with id ${taskId}!`,
    data,
  });
};

export const patchTaskByIdController = async (req, res) => {
  const { taskId } = req.params;
  const result = await updateTaskById(taskId, req.body);

  if (!result) throw createHttpError(404, 'Task not found');

  res.json({
    status: '200',
    message: 'Successfully patched a task!',
    data: result.data || result,
  });
};

export const deleteTaskByIdController = async (req, res) => {
  const { taskId } = req.params;
  const data = await deleteTaskById(taskId);

  if (!data) throw createHttpError(404, 'Task not found');

  res.status(204).send();
};
