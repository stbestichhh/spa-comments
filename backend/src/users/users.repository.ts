import { AbstractRepository } from 'nest-sequelize-repository';
import { UserModel } from '../database/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersRepository extends AbstractRepository<UserModel> {
  constructor(
    @InjectModel(UserModel) private readonly model: typeof UserModel,
  ) {
    super(model, {
      idField: 'user_id',
      autoGenerateId: true,
    });
  }
}
