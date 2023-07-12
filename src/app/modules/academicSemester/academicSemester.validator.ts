import { z } from 'zod';
import { academicSemesterMonths } from './academicSemester.constant';

const CreateAcademicSemesterValidateSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Tile is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'end month is required',
    }),
  }),
});

const UpdateAcademicSemesterValidateSchema = z
  .object({
    body: z.object({
      title: z
        .enum(['Autumn', 'Summer', 'Fall'], {
          required_error: 'Tile is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum(['01', '02', '03'], {
          required_error: 'code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'end month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'Either both title and code fields should be provided or Neither',
    }
  );
export const AcademicSemesterValidationWithZod = {
  CreateAcademicSemesterValidateSchema,
  UpdateAcademicSemesterValidateSchema,
};
