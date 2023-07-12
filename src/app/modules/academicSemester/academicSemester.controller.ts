import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { filterFields } from '../../../constants/filtersFields';
import { paginationFields } from '../../../constants/paginationFields';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const { ...academicSemester } = req.body;
  const result = await AcademicSemesterService.createSemester(academicSemester);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester created is successfully!!',
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicSemesterService.fetchAllSemester(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicSemester[]>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester retrived successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.fetchOneSemester(id);
  sendResponse<IAcademicSemester>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester retrived is successfully!!',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const result = await AcademicSemesterService.updateSemester(
    id,
    updatedFields
  );
  sendResponse<IAcademicSemester>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester updated is successfully!!',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicSemester>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester deleted is successfully!!',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleAcademicSemester,
  updateSemester,
  deleteSemester,
};
