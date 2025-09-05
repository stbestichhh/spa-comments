import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { COMMENT_SIZE_LIMIT } from '../../shared/constants';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(10, COMMENT_SIZE_LIMIT)
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  parentId?: string;
}
