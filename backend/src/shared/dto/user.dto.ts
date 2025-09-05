import { UserModel } from '../../database/models/user.model';
import { Expose, plainToInstance } from 'class-transformer';

export class UserDto {
  @Expose()
  user_id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  homepage: string | null;
}

export const toUserDto = (model: UserModel): UserDto => {
  return plainToInstance(UserDto, model, {
    excludeExtraneousValues: true,
  });
};
