import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createNewUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.newUser(user);
    res.status(200).json({
      success: true,
      message: 'new user created successfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createNewUser,
};
