import { SortOrder } from 'mongoose';

type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
type IOptionReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calculatePagination = (option: IOption): IOptionReturn => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy: option.sortBy || 'createdAt',
    sortOrder: option.sortOrder || 'desc',
  };
};

export const paginationHelpers = {
  calculatePagination,
};
