import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super({ message, status }, status);
  }
}

export const handleServiceError = (
  error: any,
  defaultMessage: string,
): never => {
  console.error(`Service error: ${error.message}`);

  if (error instanceof HttpException) {
    throw error;
  }

  throw new ApiError(
    error.message || defaultMessage,
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
