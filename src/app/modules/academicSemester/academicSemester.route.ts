import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidationWithZod } from './academicSemester.validator';

const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(
    AcademicSemesterValidationWithZod.CreateAcademicSemesterValidateSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidationWithZod.UpdateAcademicSemesterValidateSchema
  ),
  AcademicSemesterController.updateSemester
);
router.delete('/:id', AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoutes = router;
