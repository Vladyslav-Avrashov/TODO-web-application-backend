import Joi from 'joi';

const baseSchema = {
  title: Joi.string().min(3).max(30).messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title should be no longer than 30 characters.',
  }),

  description: Joi.string().min(3).max(300).messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 3 characters long',
    'string.max': 'Description should be no longer than 300 characters',
  }),

  isDone: Joi.boolean().messages({
    'boolean.base': 'isDone must be a boolean value',
  }),

  priority: Joi.number().integer().min(1).max(10).messages({
    'number.base': 'Priority must be a number',
    'number.integer': 'Priority must be an integer',
    'number.min': 'Priority must be at least 1',
    'number.max': 'Priority must be no more than 10',
  }),

  category: Joi.string().messages({
    'string.base': 'Category must be a string',
  }),

  dueDate: Joi.date().iso().messages({
    'date.base': 'Due date must be a valid date',
    'date.format': 'Due date must be in ISO format',
  }),
};

export const taskAddSchema = Joi.object({
  ...baseSchema,
  title: baseSchema.title.required(),
  description: baseSchema.description.required(),
  category: baseSchema.category.required(),
});

export const taskUpdateSchema = Joi.object(baseSchema).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});
