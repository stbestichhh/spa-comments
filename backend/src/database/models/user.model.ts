import { AllowNull, Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { CommentModel } from './comment.model';

export interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
  homepage?: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  user_id: string;

  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  homepage: string | null;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
