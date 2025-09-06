import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CommentModel } from './comment.model';

export interface AttachmentCreationAttributes {
  filePath: string;
  type: string;
  commentId: string;
}

@Table({ tableName: 'attachments', timestamps: true })
export class AttachmentModel extends Model<
  AttachmentModel,
  AttachmentCreationAttributes
> {
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  declare attachment_id: string;

  @AllowNull(false)
  @Column
  declare filePath: string;

  @AllowNull(false)
  @Column
  declare type: string;

  @ForeignKey(() => CommentModel)
  @AllowNull(false)
  @Column
  declare commentId: string;

  @BelongsTo(() => CommentModel, { as: 'attachment' })
  declare comment: CommentModel;
}
