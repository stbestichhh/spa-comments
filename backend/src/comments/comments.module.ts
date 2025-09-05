import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsListener } from './comments.listener';
import { AttachmentRepository } from './attachment.repository';
import { QueueModule } from '../queue/queue.module';
import { AuthModule } from '../auth/auth.module';
import { CommentsGateway } from './comments.gateway';

@Module({
  imports: [QueueModule, AuthModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    CommentsListener,
    AttachmentRepository,
    CommentsGateway,
  ],
})
export class CommentsModule {}
