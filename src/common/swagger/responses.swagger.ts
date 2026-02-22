import { ApiBadRequestResponse } from '@nestjs/swagger';

export const SwaggerBadRequest = (message: string) =>
  ApiBadRequestResponse({
    schema: {
      example: {
        message: message,
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  });
