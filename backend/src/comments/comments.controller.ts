import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from '../shared/guards/jwt.guard';
import { User } from '../shared/decorators/user.decorator';
import { UserDto } from '../shared/dto/user.dto';
import { FindCommentsQueryDto } from './dto/find-comments-query.dto';
import { SortBy } from '../shared/enums/sortBy.enum';
import { SortOrder } from '../shared/enums/sort-order.enum';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post()
  public async create(
    @User() { user_id }: UserDto,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(user_id, createCommentDto);
  }

  @Get()
  public async findAll(
    @Query()
    {
      page = 1,
      limit = 25,
      sortBy = SortBy.CREATED_AT,
      order = SortOrder.DESC,
    }: FindCommentsQueryDto,
  ) {
    return this.commentsService.findAll(page, limit, sortBy, order);
  }

  @Get(':id/replies')
  public async getReplies(
    @Param('id') commentId: string,
    @Query() { page = 1, limit = 25 }: FindCommentsQueryDto,
  ) {
    return this.commentsService.findReplies(commentId, page, limit);
  }
}
