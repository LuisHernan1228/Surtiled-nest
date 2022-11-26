import { Product } from 'src/products/entity/product.entity';
// import { SubCategory } from 'src/subcategories/entity/subcategory.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  // @Column()
  // categoryId: number;

  @Column()
  imgUrl: string;

  @Column()
  type: string;

  @Column('boolean', { default: true })
  active: boolean = true;

  @OneToMany(type => Product, (product) => product.category, { onDelete: 'CASCADE'})
  @JoinColumn()
  products: Product[];
}
