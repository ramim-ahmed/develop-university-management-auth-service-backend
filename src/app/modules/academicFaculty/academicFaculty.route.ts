import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidationWithZod } from './academicFaculty.validation';

const router = express.Router();
router.post(
  '/create-faculty',
  validateRequest(
    AcademicFacultyValidationWithZod.CreateAcademicFacultyValidateSchema
  ),
  AcademicFacultyController.createAcademicFaculty
);

router.get('/:id', AcademicFacultyController.getFaculty);
router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidationWithZod.updateAcademicFacultyValidateSchema
  ),
  AcademicFacultyController.updateFaculty
);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicFacultyController.gellAllFaculties);

export const AcademicFacultyRoutes = router;
