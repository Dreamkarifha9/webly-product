import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Brackets, Connection, In, Not, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProductCategoryDto } from './dto/product-category.dto';
@Injectable()
export class ProductCategoriesService {
  private readonly logger: Logger = new Logger(ProductCategoriesService.name);
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) { }
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const mapping = {
      ...createProductCategoryDto,
      id: uuid(),
    };
    return await this.productCategoryRepository.save(
      this.productCategoryRepository.create(mapping),
    );
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  async findOne(id: string) {
    const productCategory = await this.productCategoryRepository.findOne({
      where: { id },
    });
    if (!productCategory)
      throw new HttpException(`categoryId notFound`, HttpStatus.BAD_REQUEST);
    return productCategory;
  }

  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    const productCategory = await this.findOne(id);
    const mapping: ProductCategoryDto = {
      ...productCategory,
      ...updateProductCategoryDto,
    };
    return await this.productCategoryRepository.save(mapping);
  }

  async delete(id: string) {
    // TODO: soft delete
    const productCategory = await this.findOne(id);
    const mapping: ProductCategoryDto = {
      ...productCategory,
      active: false,
      deleted: true,
    };

    return await this.productCategoryRepository.save(mapping);
  }
}
