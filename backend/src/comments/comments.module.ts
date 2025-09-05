import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsListener } from './comments.listener';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentsListener],
})
export class CommentsModule {}
