import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await StudentService.fetchAllStudents(
    filters,
    paginationOptions
  );
  sendResponse<IStudent[]>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Academic semester retrived successfully!!',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.fetchSingleStudent(id);
  sendResponse<IStudent>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'student retrived is successfully!!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateStudent(id, payload);
  sendResponse<IStudent>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'student updated is successfully!!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Student deleted is successfully!!',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
