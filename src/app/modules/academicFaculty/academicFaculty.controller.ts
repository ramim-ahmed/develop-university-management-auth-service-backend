import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { facultyFilterFields } from '../../../constants/filtersFields';
import { paginationFields } from '../../../constants/paginationFields';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const { ...academicFaculty } = req.body;
  const result = await AcademicFacultyService.createFaculty(academicFaculty);
  sendResponse<IAcademicFaculty>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic faculty created is successfully!!',
    data: result,
  });
});

const gellAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await AcademicFacultyService.fetchAllFaculties(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicFaculty[]>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic Faculties is retrived successfully!!',
    meta: result.meta,
    data: result.data,
  });
});

const getFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.fetchOneFaculties(id);
  sendResponse<IAcademicFaculty>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrived is successfully!!',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const result = await AcademicFacultyService.updatefaculty(id, updatedFields);
  sendResponse<IAcademicFaculty>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester updated is successfully!!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteFaculty(id);

  sendResponse<IAcademicFaculty>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic facuty deleted is successfully!!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  gellAllFaculties,
  getFaculty,
  updateFaculty,
  deleteFaculty,
};
