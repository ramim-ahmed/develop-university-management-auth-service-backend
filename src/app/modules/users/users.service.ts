import config from '../../config';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generatedUserId } from './users.utils';

export const newUser = async (user: IUser): Promise<IUser | null> => {
  // user id set
  user.id = await generatedUserId();
  // default password set
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASSWORD as string;
  }
  const newUser = await User.create(user);

  if (!newUser) {
    throw new Error('Failed to create new user!!');
  }
  return newUser;
};
