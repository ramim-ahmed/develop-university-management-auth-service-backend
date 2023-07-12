import express from 'express';
import { AcademicDepartmentRoutes } from '../app/modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../app/modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route?.path, route?.route);
});
export default router;
