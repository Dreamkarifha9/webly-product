import { OmitType } from '@nestjs/swagger';

import { ProductSkuDto } from './product-sku-dto';

export class UpdateProductSkusDto extends OmitType(ProductSkuDto, [
  'productId',
]) { }
