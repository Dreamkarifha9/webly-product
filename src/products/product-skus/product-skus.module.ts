import { Module } from '@nestjs/common';
import { ProductSku } from './entities/product-skus.entity';
import { ProductSkusService } from './product-skus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([ProductSku])],
  controllers: [],
  providers: [ProductSkusService],
  exports: [ProductSkusService],
})
export class ProductSkusModule { }
