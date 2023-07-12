import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentField } = req.body;
    const result = await AcademicDepartmentService.createDepartment(
      academicDepartmentField
    );
    sendResponse<IAcademicDepartment>(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Academic department created is successfully!!',
      data: result,
    });
  }
);

const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicDepartmentService.fetchAllDepartments(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicDepartment[]>(res, {
      status: httpStatus.OK,
      success: true,
      message: 'Academic department is retrived successfully!!',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department retrived is successfully!!',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedFields = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedFields
  );
  sendResponse<IAcademicDepartment>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department updated is successfully!!',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic department deleted is successfully!!',
    data: result,
  });
});
export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};
