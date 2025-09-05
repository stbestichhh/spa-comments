import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { CommentModel } from './comment.model';

export interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
  homepage: string | null;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  declare user_id: string;

  @AllowNull(false)
  @Unique
  @Column
  declare username: string;

  @AllowNull(false)
  @Unique
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  declare homepage: string | null;

  @HasMany(() => CommentModel)
  declare comments: CommentModel[];
}
