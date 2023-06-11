import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interface/common';
import { IGenericErrorMessage } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: 400,
    message: 'ValidationError',
    errorMessages: errors,
  };
};

export default handleValidationError;
