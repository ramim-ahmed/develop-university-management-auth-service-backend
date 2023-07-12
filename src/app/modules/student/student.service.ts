/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApirError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/paginationOptions';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constants';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const fetchAllStudents = async (
  filters: IStudentFilters,
  payload: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(payload);
  const { searchTerm, ...filterAbleData } = filters;

  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate([
      {
        path: 'academicFaculty',
        model: 'AcademicFaculty',
      },
      {
        path: 'academicDepartment',
        model: 'AcademicDepartment',
      },
      {
        path: 'academicSemester',
        model: 'AcademicSemester',
      },
    ])
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Student.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const fetchSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not Found!');
  }
  const { name, guardian, localGuardian, ...studentFields } = payload;
  const updatedData: Partial<IStudent> = { ...studentFields };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>;
      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>;
      (updatedData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>;
      (updatedData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ id }, updatedData, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester');
  return result;
};
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession();
  let result = null;
  try {
    session.startTransaction();
    result = await Student.findOneAndDelete({ id })
      .populate('')
      .populate('academicFaculty')
      .populate('academicDepartment')
      .populate('academicSemester');
    if (result) {
      await User.findOneAndDelete({ id });
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return result;
};
export const StudentService = {
  fetchAllStudents,
  fetchSingleStudent,
  updateStudent,
  deleteStudent,
};
