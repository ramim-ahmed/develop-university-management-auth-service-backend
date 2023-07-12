import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicDepartmentValidatinWithZod } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartmentController';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidatinWithZod.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/:id', AcademicDepartmentController.getDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidatinWithZod.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
export const AcademicDepartmentRoutes = router;
