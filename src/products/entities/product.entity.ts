import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { BasicData } from '../../shared';
import { ProductSku } from '../product-skus/entities/product-skus.entity';

@Entity('products', { schema: 'product' })
export class Product extends BasicData {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => ProductSku, (productsku) => productsku.product)
  sku: ProductSku;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  // orderItems: OrderItem[];
}
