import path from 'node:path';

export const SORT_LIST = ['asc', 'desc'];

export const TASK_CATEGORIES = [
  'work',
  'personal',
  'health',
  'education',
  'finance',
  'home',
  'shopping',
  'travel',
  'social',
  'hobby',
];

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
