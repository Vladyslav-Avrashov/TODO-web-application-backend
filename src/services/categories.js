import { Category } from '../db/models/Category.js';

export const getCategories = async () => {
  const categories = await Category.find().sort({ name: 1 });
  return categories;
};
