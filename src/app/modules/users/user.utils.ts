import { User } from './user.model';

const findLastUserId = async () => {
  const findId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return findId?.id;
};
export const generatedUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
  const userId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return userId;
};
