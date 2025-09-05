import { Injectable } from '@nestjs/common';
import { RaitoService } from '@raito-cache/nestjs';
import { OnEvent } from '@nestjs/event-emitter';
import { COMMENT_CREATED_EVENT } from '../shared/constants';

@Injectable()
export class CommentsListener {
  constructor(private readonly cacheService: RaitoService) {}

  @OnEvent(COMMENT_CREATED_EVENT)
  public async handleCommentCreated() {
    await this.cacheService.clear('');
  }
}
