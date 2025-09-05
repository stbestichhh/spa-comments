import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
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
  parentId: string | null;
}

@Table({ tableName: 'comments', timestamps: true })
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
  @Default(null)
  @Column({ type: DataType.STRING })
  declare parentId: string | null;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  declare userId: string;

  @BelongsTo(() => UserModel, { as: 'user' })
  declare user: UserModel;
}
