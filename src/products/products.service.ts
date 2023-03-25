import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { Product } from './entities/product.entity';
import { Brackets, Connection, In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMockupProductDto } from './dto/create-mockup-product.dto';
import { ProductSkusService } from '../products/product-skus/product-skus.service';
import { ProductDto } from './dto/product.dto';
@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);
  constructor(
    private connection: Connection,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productSkusService: ProductSkusService,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const queryRunner = this.connection.createQueryRunner();
    const productId = uuid();
    const skuId = uuid();
    try {
      const { sku, ...product } = createProductDto;
      // create product
      const newProduct = this.createProductMockup({
        id: productId,
        ...product,
      });
      // create productSku
      const newProductSku = this.productSkusService.createProductSkuMockup({
        id: skuId,
        productId,
        ...sku,
      });
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.save(newProduct);
      this.logger.debug('create product suscess');

      await queryRunner.manager.save(newProductSku);
      this.logger.debug('create productSku suscess');

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.debug('error', error.status);
      this.logger.debug('error', JSON.stringify(error));

      throw new HttpException(`${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
    const resultProduct = await this.findOne(productId);
    return resultProduct;
  }

  createProductMockup(dto: CreateMockupProductDto) {
    return this.productRepository.create(dto);
  }

  async findAll() {
    const active = true;
    const deleted = false;
    const foundProduct = await this.getJoinSku()
      .andWhere('products.active = :active', { active })
      .andWhere('products.deleted = :deleted', { deleted })
      .getMany();
    if (!foundProduct)
      throw new HttpException(`Product notFound `, HttpStatus.BAD_REQUEST);
    return foundProduct;
  }

  async findOne(id: string) {
    const active = true;
    const deleted = false;
    const foundProduct = await this.getJoinSku()
      .andWhere('products.active = :active', { active })
      .andWhere('products.deleted = :deleted', { deleted })
      .andWhere('products.id = :id', { id })
      .getOne();
    if (!foundProduct)
      throw new HttpException(`Product notFound `, HttpStatus.BAD_REQUEST);
    return foundProduct;
  }

  private getJoinSku() {
    return this.productRepository
      .createQueryBuilder('products')
      .select(['products.id', 'products.name', 'products.description'])
      .leftJoin('products.sku', 'productsSku')
      .addSelect(['productsSku']);
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const queryRunner = this.connection.createQueryRunner();

    try {
      const { sku } = updateProductDto;
      // create product
      const newProduct = this.createProductMockup({
        id: productId,
        ...updateProductDto,
      });
      // create productSku
      const newProductSku = this.productSkusService.createProductSkuMockup({
        productId,
        ...sku,
      });
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.save(newProduct);
      this.logger.debug('update product suscess');

      await queryRunner.manager.save(newProductSku);
      this.logger.debug('update productSku suscess');

      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.debug('error', error.status);
      this.logger.debug('error', JSON.stringify(error));

      throw new HttpException(`${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
    const resultProduct = await this.findOne(productId);
    return resultProduct;
  }

  async delete(id: string) {
    // TODO: soft delete
    const productCategory = await this.findOne(id);
    const mapping: ProductDto = {
      ...productCategory,
      active: false,
      deleted: true,
    };

    return await this.productRepository.save(mapping);
  }
}
