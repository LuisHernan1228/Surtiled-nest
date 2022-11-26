import { Product } from 'src/products/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @ManyToOne(() => Product, (product) => product.favorites)
  product: Product;
}
