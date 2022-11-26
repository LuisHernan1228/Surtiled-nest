import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holder: string;

  @Column()
  accountNumber: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  email: string;
}