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

export const parseTaskFilters = ({ priority, isDone }) => {
  const parsedPriority = parsePriority(priority);
  const parsedIsDone = parseBoolean(isDone);
  return {
    priority: parsedPriority,
    isDone: parsedIsDone,
  };
};
