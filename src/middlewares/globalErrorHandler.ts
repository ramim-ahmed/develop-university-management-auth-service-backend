/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/ApirError';
import { handleCastError } from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { IGenericErrorMessage } from '../interface/error';
import { errorLogger } from '../shared/logger';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === 'development' ? console.log(err) : errorLogger.error(err);
  let statusCode = 500;
  let message = 'something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err);
    statusCode = simpliFiedError.statusCode;
    message = simpliFiedError.message;
    errorMessages = simpliFiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simpliFiedZodError = handleZodError(err);
    statusCode = simpliFiedZodError.statusCode;
    message = simpliFiedZodError.message;
    errorMessages = simpliFiedZodError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  } else if (err?.name === 'CastError') {
    const simpliFiedCastError = handleCastError(err);
    statusCode = simpliFiedCastError.statusCode;
    message = simpliFiedCastError.message;
    errorMessages = simpliFiedCastError.errorMessages;
  } else if (err instanceof Error) {
    console.log('Error scope');

    message = err?.message;
    errorMessages = err?.message ? [{ path: '', message: err?.message }] : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
