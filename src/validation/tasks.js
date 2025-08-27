import Joi from 'joi';
import { TASK_CATEGORIES } from '../constants/index.js';

const titleField = Joi.string().min(3).max(30).messages({
  'string.base': 'Title must be a string',
  'string.empty': 'Title cannot be an empty field',
  'string.min': 'Title must be at least 3 characters long',
  'string.max': 'Title should be no longer than 30 characters.',
});

const descriptionField = Joi.string().min(3).max(300).messages({
  'string.base': 'Description must be a string',
  'string.empty': 'Description cannot be an empty field',
  'string.min': 'Description must be at least 3 characters long',
  'string.max': 'Description should be no longer than 300 characters',
});

const isDoneField = Joi.boolean().messages({
  'boolean.base': 'isDone must be a boolean value',
});

const priorityField = Joi.number().integer().min(1).max(10).messages({
  'number.base': 'Priority must be a number',
  'number.integer': 'Priority must be an integer',
  'number.min': 'Priority must be at least 1',
  'number.max': 'Priority must be no more than 10',
});

const categoryField = Joi.string()
  .valid(...TASK_CATEGORIES)
  .messages({
    'string.base': 'Category must be a string',
    'any.only': `Category must be one of: ${TASK_CATEGORIES.join(', ')}`,
  });

const dueDateField = Joi.date().iso().messages({
  'date.base': 'Due date must be a valid date',
  'date.format': 'Due date must be in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)',
});

export const taskAddSchema = Joi.object({
  title: titleField
    .required()
    .messages({ 'any.required': 'Title is required' }),
  description: descriptionField
    .required()
    .messages({ 'any.required': 'Description is required' }),
  isDone: isDoneField,
  priority: priorityField,
  category: categoryField,
  dueDate: dueDateField,
});

export const taskUpdateSchema = Joi.object({
  title: titleField,
  description: descriptionField,
  isDone: isDoneField,
  priority: priorityField,
  category: categoryField,
  dueDate: dueDateField,
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });
