import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommentModel } from '../database/models/comment.model';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class CommentsGateway {
  @WebSocketServer()
  server: Server;

  public emitNewComment(comment: CommentModel) {
    this.server.emit('commentCreated', comment);
  }
}
