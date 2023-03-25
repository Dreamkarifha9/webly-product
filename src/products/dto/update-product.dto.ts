import { ProductDto } from './product.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';

import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateProductSkusDto } from '../product-skus/dto/update-product-skus.dto';
export class UpdateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy',
  'active',
  'deleted',
]) {
  updatedBy?: string;
  @ApiProperty({ type: UpdateProductSkusDto })
  @ValidateNested({ each: true })
  @Type(() => UpdateProductSkusDto)
  sku: UpdateProductSkusDto;
}
