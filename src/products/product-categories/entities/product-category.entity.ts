import { Product } from '../../entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BasicData } from '../../../shared';
@Entity('categories', { schema: 'product' })
export class ProductCategory extends BasicData {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;
}
