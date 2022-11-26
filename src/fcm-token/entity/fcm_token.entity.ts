import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class FcmToken {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // userId: number;

  @Column({nullable: false})
  role: string;

  @Column({nullable: false})
  token: string;

  @ManyToOne(() => User, (user) => user.token)
  user: User[]
}
