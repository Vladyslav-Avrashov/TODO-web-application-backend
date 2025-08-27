import mongoose from 'mongoose';

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return;
  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
};

const parsePriority = (value) => {
  if (typeof value === 'number') {
    return Number.isInteger(value) && value >= 1 && value <= 10
      ? value
      : undefined;
  }
  if (typeof value !== 'string') return;
  const trimmed = value.trim();
  if (trimmed.length === 0) return;
  const num = Number(trimmed);
  return Number.isInteger(num) && num >= 1 && num <= 10 ? num : undefined;
};

const parseString = (str) => {
  if (typeof str !== 'string') return;
  const trimmed = str.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const parseCategory = (value) => {
  const parsed = parseString(value);
  if (!parsed) return;
  return mongoose.Types.ObjectId.isValid(parsed) ? parsed : undefined;
};

const parseDate = (value) => {
  if (!value) return;
  if (value instanceof Date) return value;
  if (typeof value !== 'string') return;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
};

export const parseTaskFilters = ({ priority, isDone, category, dueDate }) => {
  const parsedPriority = parsePriority(priority);
  const parsedIsDone = parseBoolean(isDone);
  const parsedCategory = parseCategory(category);
  const parsedDueDate = parseDate(dueDate);

  return {
    priority: parsedPriority,
    isDone: parsedIsDone,
    category: parsedCategory,
    dueDate: parsedDueDate,
  };
};
