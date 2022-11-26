import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { BankAccount } from './entity/bankaccount.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { FcmTokenModule } from 'src/fcm-token/fcm-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderList, BankAccount]),
    UsersModule,
    ProductsModule,
    FcmTokenModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
