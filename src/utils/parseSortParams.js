import { SORT_LIST } from '../constants/index.js';

export const parseSortParams = ({ sortOrder, sortBy }, sortFields) => {
  const parsedSortOrder = SORT_LIST.includes(sortOrder)
    ? sortOrder
    : SORT_LIST[0];
  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : sortFields[0];

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
