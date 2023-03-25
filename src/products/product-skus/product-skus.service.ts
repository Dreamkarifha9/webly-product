import { Injectable, Logger } from '@nestjs/common';
import { CreateProductSkusDto } from './dto/create-product-skus.dto';
import { UpdateProductSkusDto } from './dto/update-product-skus.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSku } from './entities/product-skus.entity';
@Injectable()
export class ProductSkusService {
  private readonly logger: Logger = new Logger(ProductSkusService.name);
  constructor(
    @InjectRepository(ProductSku)
    private readonly productSkuRepository: Repository<ProductSku>,
  ) { }

  createProductSkuMockup(createProductSkusDto: CreateProductSkusDto) {
    const newProductSku =
      this.productSkuRepository.create(createProductSkusDto);
    return newProductSku;
  }
}
