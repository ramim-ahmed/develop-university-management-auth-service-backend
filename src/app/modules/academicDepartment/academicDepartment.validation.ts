import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required!',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});
export const AcademicDepartmentValidatinWithZod = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
