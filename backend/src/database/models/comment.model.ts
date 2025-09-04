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
import { UserModel } from './user.model';

export interface CommentCreationAttributes {
  text: string;
  userId: string;
}

@Table({ tableName: 'comments' })
export class CommentModel extends Model<
  CommentModel,
  CommentCreationAttributes
> {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  comment_id: string;

  @AllowNull(false)
  @Column
  text: string;

  @AllowNull
  @ForeignKey(() => CommentModel)
  @Column
  parentId: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
