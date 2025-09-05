import { createParamDecorator } from '@nestjs/common';
import e from 'express';
import { UserPayloadDto } from '../dto/user-payload.dto';

export const User = createParamDecorator(
  (data: keyof UserPayloadDto, context) => {
    const request: e.Request = context.switchToHttp().getRequest();
    const user = request.user as UserPayloadDto;

    if (data) {
      return user[data];
    }

    return user;
  },
);
