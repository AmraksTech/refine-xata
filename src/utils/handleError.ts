import { HttpError } from '@refinedev/core';
import { XataError } from '@xata.io/client'; // Update this import according to the actual error type provided by Xata

export const handleError = (error: XataError) => {
  const customError: HttpError = {
    ...error,
    message: error.message,
    statusCode: error.status,
  };
  return Promise.reject(customError);
};
