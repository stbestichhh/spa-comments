import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserBodyDto } from '../users/dto/create-user-body.dto';
import { UserDto } from '../shared/dto/user.dto';
import { compare } from 'bcrypt';
import { UserPayloadDto } from '../shared/dto/user-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: CreateUserBodyDto): Promise<UserDto> {
    return this.usersService.create(dto);
  }

  public async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const pwMatch = await compare(password, user.password);

    if (!pwMatch) {
      throw new UnauthorizedException(`Credentials are invalid`);
    }

    const payload: UserPayloadDto = { sub: user.user_id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token, payload };
  }

  public async validateUser(user_id: string) {
    return this.usersService.findById(user_id);
  }
}
