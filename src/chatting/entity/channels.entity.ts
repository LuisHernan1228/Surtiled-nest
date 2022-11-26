import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.user1)
  user1: User;

  @ManyToOne(() => User, (user) => user.user2)
  user2: User;

  @Column()
  createdAt: Date;
}
