import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';
const createStudent = catchAsync(async (req, res) => {
  const { student, ...user } = req.body;
  const result = await UserService.createNewStudent(student, user);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'new user created successfully!!',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
