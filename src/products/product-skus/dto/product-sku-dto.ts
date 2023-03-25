import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class ProductSkuDto {
  @ApiPropertyOptional()
  @Type(() => String)
  id?: string;

  @ApiPropertyOptional()
  @Type(() => String)
  productId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  categoryId: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  salePrice?: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  qty: number;

  @ApiPropertyOptional()
  @Type(() => String)
  coverImage?: string;
}
