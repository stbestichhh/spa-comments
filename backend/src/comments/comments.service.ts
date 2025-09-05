import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './comments.repository';
import { SortBy } from '../shared/enums/sortBy.enum';
import { SortOrder } from '../shared/enums/sort-order.enum';
import { UserModel } from '../database/models/user.model';
import { RaitoService } from '@raito-cache/nestjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { COMMENT_CREATED_EVENT } from '../shared/constants';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly cacheService: RaitoService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(userId: string, createCommentDto: CreateCommentDto) {
    if (createCommentDto.parentId) {
      const parent = await this.commentsRepository.findByPk(
        createCommentDto.parentId,
      );
      if (!parent) {
        throw new NotFoundException(
          `Comment not found by ${createCommentDto.parentId} id`,
        );
      }
    }

    const comment = await this.commentsRepository.create({
      text: createCommentDto.text,
      parentId: createCommentDto.parentId ?? null,
      userId,
    });

    this.eventEmitter.emit(COMMENT_CREATED_EVENT, comment);

    return comment;
  }

  public async findAll(
    page = 1,
    limit = 25,
    sortBy: SortBy = SortBy.CREATED_AT,
    order: SortOrder = SortOrder.DESC,
  ) {
    const cacheKey = `comments:${page}:${limit}:${sortBy}:${order}`;
    const cached = await this.cacheService.get(cacheKey);

    if (cached) {
      return cached.data;
    }

    const offset = (page - 1) * limit;
    const data = await this.commentsRepository.findPaginated(
      offset,
      limit,
      sortBy,
      order,
    );

    await this.cacheService.set(cacheKey, data, 10000);

    return data;
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
