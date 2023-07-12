import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const findId = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return findId?.id ? findId.id.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let studentID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  studentID = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${studentID}`;
  return studentID;
};

const findLastFacultyId = async () => {
  const findId = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return findId?.id ? findId.id.substring(2) : undefined;
};

export const generatedFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let facultyID = (parseInt(currentId) + 1).toString().padStart(5, '0');

  facultyID = `F-${facultyID}`;
  return facultyID;
};
