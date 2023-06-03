import { Request, Response } from 'express';
import { newUser } from './users.service';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await newUser(user);
    res.status(200).json({
      success: true,
      message: 'new user created successfully!!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed new user created!!',
      error,
    });
  }
};
