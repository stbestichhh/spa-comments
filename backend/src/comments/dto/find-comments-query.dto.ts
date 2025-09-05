import { SortBy } from '../../shared/enums/sortBy.enum';
import { SortOrder } from '../../shared/enums/sort-order.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class FindCommentsQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => Number(value))
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  limit?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsEnum(SortOrder)
  @IsNotEmpty()
  @IsOptional()
  order?: SortOrder;
}
