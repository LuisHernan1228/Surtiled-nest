import { Body, Controller, Get, Post, Req, UseGuards, Header, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateBankAccountDto } from './dto/create-bankaccount.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderList } from './entity/orderlist.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/product')
  findOrderProducts(): Promise<Order[]> {
    const orders = this.ordersService.findOrderProducts();
    return orders;
  }

  @Get('/service')
  findOrderServices(): Promise<Order[]> {
    const orders = this.ordersService.findOrderServices();
    return orders;
  }

  @Get('/all')
  findOrderAll(): Promise<Order[]> {
    const orders = this.ordersService.findOrderAll();
    return orders;
  }

  
  @Get('ordered-number')
  async getOrderedNumber() {
    // return this.ordersService.getOrderedNumber()
    const products = await (await this.ordersService.findOrderProducts()).length
    const services = await (await this.ordersService.findOrderServices()).length
    return { products, services }
  }

  @Get(':id')
  getOrder(@Param('id') id: number): Promise<OrderList[]> {
    const orders = this.ordersService.findOne(id);
    return orders;
  }
  
  @Get('orderNumber/:id')
  getOrderNumber(@Param('id') id: number): Promise<number> {
    return this.ordersService.generateOrderNumber(id)
  }
  
  @Post('add')
  @Header('content-type', 'application/x-www-form-urlencoded')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log("order add request: ", createOrderDto);
    this.ordersService.create(createOrderDto)
    return true;
  }

  @Post('delivery/:id')
  deliveryAction(@Param('id') id: number) {
    return this.ordersService.deliveryAction(id)
  }

  @Post('accept/:id')
  acceptAction(@Param('id') id: number) {
    return this.ordersService.acceptAction(id)
  }

  @Post('remove/:id')
  removeAction(@Param('id') id: number) {
    return this.ordersService.removeAction(id)
  }

  @Post('received/:id')
  completeAction(@Param('id') id: number) {
    return this.ordersService.receivedAction(id)
  }

  @Get('completed/:id')
  getCompletedOrder(@Param('id') id: number) {
    return this.ordersService.getCompletedOrders(id)
  }

  @Post('bank/add')
  registerBankAccount(@Body() data: CreateBankAccountDto) {
    return this.ordersService.registerBankAccount(data)
  }

  @Get('bank/get')
  getBankAccount()/*: Promise<CreateBankAccountDto> */{
    return this.ordersService.getBankAccount()
      .then(result => result[0])
      .catch(err => err)
  }
}
