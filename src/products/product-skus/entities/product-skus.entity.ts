import { Product } from '../../entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('skus', { schema: 'product' })
export class ProductSku {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Column({ type: 'uuid', nullable: false })
  categoryId: string;

  @Column({ type: 'money', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'money', precision: 10, scale: 2, nullable: true })
  salePrice?: number;

  @Column({ type: 'bigint', nullable: false })
  qty: number;

  @Column({ type: 'varchar', nullable: true })
  coverImage?: string;

  @OneToOne(() => Product, (product) => product.sku)
  @JoinColumn({ name: 'productId' })
  product: Product;

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.productSku)
  // orderItems: OrderItem[];
}
