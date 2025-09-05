import { AbstractRepository } from 'nest-sequelize-repository';
import { Injectable } from '@nestjs/common';
import { CommentModel } from '../database/models/comment.model';
import { InjectModel } from '@nestjs/sequelize';
import { SortBy } from '../shared/enums/sortBy.enum';
import { SortOrder } from '../shared/enums/sort-order.enum';
import { UserModel } from '../database/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CommentsRepository extends AbstractRepository<CommentModel> {
  constructor(
    @InjectModel(CommentModel) private readonly model: typeof CommentModel,
  ) {
    super(model, {
      autoGenerateId: true,
      idField: 'comment_id',
    });
  }

  public async findPaginated(
    offset: number,
    limit: number,
    sortBy: SortBy,
    sortOrder: SortOrder,
  ) {
    const isSortByUser = [SortBy.USERNAME, SortBy.EMAIL].includes(sortBy);

    return this.model.findAll({
      where: { parentId: null },
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['user_id', 'username', 'email'],
        },
      ],
      order: [
        [isSortByUser ? Sequelize.col(`user.${sortBy}`) : sortBy, sortOrder],
      ],
      offset,
      limit,
    });
  }
}
