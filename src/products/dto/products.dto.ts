import { IResponse } from '../../shared';
import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class ProductsDto implements IResponse<ProductDto[]> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  error: string[];

  @ApiProperty({
    type: ProductDto,
    isArray: true,
  })
  data: ProductDto[];

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  totalPage?: number;

  @ApiProperty()
  total?: number;
}
