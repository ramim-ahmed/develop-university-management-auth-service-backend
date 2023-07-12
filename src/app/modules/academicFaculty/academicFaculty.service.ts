import { SortOrder } from 'mongoose';
import { academicFacultyFields } from '../../../constants/academicSemesterFields';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/paginationOptions';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const fetchAllFaculties = async (
  filters: IAcademicFacultyFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(payload);
  const { searchTerm, ...filterAbleData } = filters;

  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: academicFacultyFields.map(field => ({
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
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const fetchOneFaculties = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updatefaculty = async (
  id: string,
  updateFields: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updateFields,
    { new: true }
  );
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyService = {
  createFaculty,
  fetchAllFaculties,
  fetchOneFaculties,
  updatefaculty,
  deleteFaculty,
};
