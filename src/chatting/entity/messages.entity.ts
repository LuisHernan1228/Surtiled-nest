import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channels.entity";

@Entity()
export class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Channel, (channel) => channel)
  channel: Channel;

  @Column()
  senderId: number;

  @Column()
  message: string;

  @Column()
  createdAt: Date;
}
