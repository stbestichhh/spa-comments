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
  declare comment_id: string;

  @AllowNull(false)
  @Column
  declare text: string;

  @AllowNull
  @ForeignKey(() => CommentModel)
  @Column
  declare parentId: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  declare userId: string;

  @BelongsTo(() => UserModel)
  declare user: UserModel;
}
