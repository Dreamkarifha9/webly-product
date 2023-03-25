import { ProductSkuDto } from './product-sku-dto';
import { OmitType } from '@nestjs/swagger';
export class CreateProductSkusDto extends OmitType(ProductSkuDto, [
  'id',
  'productId',
]) {
  id?: string;
  productId?: string;
}
