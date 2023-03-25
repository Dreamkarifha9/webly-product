import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductSkusModule } from './product-skus/product-skus.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],

  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8081,
        },
      },
    ]),
    ProductSkusModule,
    ProductCategoriesModule,
  ],
})
export class ProductsModule { }
