import config from '../../../config';
import ApiError from '../../../errors/ApirError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';

const newUser = async (user: IUser): Promise<IUser | null> => {
  // user id set
  user.id = await generatedUserId();
  // default password set
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASSWORD as string;
  }
  const newUser = await User.create(user);

  if (!newUser) {
    throw new ApiError(400, 'Failed to create new user!!');
  }
  return newUser;
};

export const UserService = {
  newUser,
};
