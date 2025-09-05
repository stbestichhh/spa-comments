import { Expose } from 'class-transformer';

export class UserPayloadDto {
  @Expose()
  sub: string;

  @Expose()
  email: string;
}
