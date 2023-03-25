import { ProductCategoryDto } from './product-category.dto';
import { PickType } from '@nestjs/swagger';
export class CreateProductCategoryDto extends PickType(ProductCategoryDto, [
  'name',
  'description',
]) {
  createdBy?: string;
}
