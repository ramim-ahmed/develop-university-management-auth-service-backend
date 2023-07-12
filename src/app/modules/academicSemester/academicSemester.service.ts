import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { academicSemesterFields } from '../../../constants/academicSemesterFields';
import ApiError from '../../../errors/ApirError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/paginationOptions';
import { academicSemesterTitlesWithCode } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitlesWithCode[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!!!');
  }
  const result = await AcademicSemester.create(payload);

  return result;
};

const fetchAllSemester = async (
  filters: IAcademicSemesterFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(payload);
  const { searchTerm, ...filterAbleData } = filters;

  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: academicSemesterFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterAbleData).length) {
    searchCondition.push({
      $and: Object.entries(filterAbleData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: 'i',
        },
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    searchCondition.length > 0 ? { $and: searchCondition } : {};
  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const fetchOneSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const updateSemester = async (
  id: string,
  updateFields: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    updateFields.title &&
    updateFields.code &&
    academicSemesterTitlesWithCode[updateFields.title] !== updateFields.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code!!!');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updateFields,
    { new: true }
  );
  return result;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  fetchAllSemester,
  fetchOneSemester,
  updateSemester,
  deleteSemester,
};
