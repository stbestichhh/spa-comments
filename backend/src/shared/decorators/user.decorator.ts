import { createParamDecorator } from '@nestjs/common';
import e from 'express';
import { UserDto } from '../dto/user.dto';

export const User = createParamDecorator((data: keyof UserDto, context) => {
  const request: e.Request = context.switchToHttp().getRequest();
  const user = request.user as UserDto;

  if (data) {
    return user[data];
  }

  return user;
});
