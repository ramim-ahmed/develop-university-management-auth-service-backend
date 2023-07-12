import { z } from 'zod';

const CreateAcademicFacultyValidateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

const updateAcademicFacultyValidateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
export const AcademicFacultyValidationWithZod = {
  CreateAcademicFacultyValidateSchema,
  updateAcademicFacultyValidateSchema,
};
