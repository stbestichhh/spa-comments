import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { SortBy } from '../shared/enums/sortBy.enum';
import { SortOrder } from '../shared/enums/sort-order.enum';
import { UserModel } from '../database/models/user.model';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async create(userId: string, createCommentDto: CreateCommentDto) {
    return await this.commentsRepository.create({
      text: createCommentDto.text,
      parentId: createCommentDto.parentId ?? null,
      userId,
    });
  }

  public async findAll(
    page = 1,
    limit = 25,
    sortBy: SortBy = SortBy.CREATED_AT,
    order: SortOrder = SortOrder.DESC,
  ) {
    const offset = (page - 1) * limit;

    return this.commentsRepository.findPaginated(offset, limit, sortBy, order);
  }

  public async findReplies(commentId: string, page = 1, limit = 25) {
    const offset = (page - 1) * limit;

    return this.commentsRepository.findAll(
      {
        parentId: commentId,
      },
      {
        include: [
          { model: UserModel, attributes: ['user_id', 'username', 'email'] },
        ],
        order: [['createdAt', 'ASC']],
        limit,
        offset,
      },
    );
  }
}
