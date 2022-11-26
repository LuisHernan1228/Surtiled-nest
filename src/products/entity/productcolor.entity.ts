import { Category } from 'src/categories/entity/category.entity';
import { Favorite } from 'src/favorites/entity/favorites.entity';
import { OrderList } from 'src/orders/entity/orderlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @ManyToOne(() => Product, (product) => product.productColor)
  product: Product
}
