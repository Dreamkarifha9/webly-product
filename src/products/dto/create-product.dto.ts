import { ProductDto } from './product.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateProductSkusDto } from '../product-skus/dto/create-product-skus.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'createdBy',
  'updatedAt',
  'updatedBy',
  'active',
  'deleted',
]) {
  @ApiProperty({ type: CreateProductSkusDto })
  @ValidateNested({ each: true })
  @Type(() => CreateProductSkusDto)
  sku: CreateProductSkusDto;
}
