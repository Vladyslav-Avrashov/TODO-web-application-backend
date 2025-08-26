import TaskCollection from '../db/models/Task.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getTasks = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = TaskCollection.find();

  if (typeof filters.priority === 'number') {
    query.where('priority').equals(filters.priority);
  }

  if (typeof filters.isDone === 'boolean') {
    query.where('isDone').equals(filters.isDone);
  }

  const totalItems = await TaskCollection.countDocuments(query.getFilter());

  const items = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder, _id: 1 });

  const data = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    totalItems,
    page,
    perPage,
    ...data,
  };
};

export const getTaskById = (id) => TaskCollection.findById(id);

export const addTask = (payload) => TaskCollection.create(payload);

export const updateTaskById = async (id, payload, options = {}) => {
  const result = await TaskCollection.findByIdAndUpdate(id, payload, {
    new: true,
    ...options,
  });

  return result;
};

export const deleteTaskById = (id) => TaskCollection.findByIdAndDelete(id);
