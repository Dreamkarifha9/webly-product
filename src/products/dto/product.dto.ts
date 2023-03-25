import { BaseDataDto } from '../../shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto extends BaseDataDto {
  @ApiPropertyOptional()
  @Type(() => String)
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @ApiPropertyOptional()
  @Type(() => String)
  description?: string;
}
