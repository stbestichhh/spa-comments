import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { toUserDto, UserDto } from '../shared/dto/user.dto';
import { genSaltSync, hash } from 'bcrypt';
import { UserModel } from '../database/models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(dto: CreateUserBodyDto): Promise<UserDto> {
    const passwordHash = await hash(dto.password, genSaltSync());

    const newUser = await this.usersRepository.insert({
      username: dto.username,
      email: dto.email,
      password: passwordHash,
      homepage: dto.homepage ?? null,
    });

    return toUserDto(newUser);
  }

  public async findByEmail(email: string): Promise<UserModel> {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User not found by ${email} email`);
    }

    return user;
  }

  public async findById(user_id: string): Promise<UserModel> {
    const user = await this.usersRepository.findByPk(user_id);

    if (!user) {
      throw new NotFoundException(`User not found by ${user_id} id`);
    }

    return user;
  }
}
