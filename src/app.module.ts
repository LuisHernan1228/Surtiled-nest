import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categoies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { AppGateway } from './app.gateway';
import { ChattingModule } from './chatting/chatting.module';
import { FavoritesModule } from './favorites/favorites.module';
import * as path from 'path';
import { FcmModule } from 'nestjs-fcm';
import { FcmTokenModule } from './fcm-token/fcm-token.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,

      host: 'priva230.spindns.com',
      username: 'nousproyec1_surtiled',
      password: '$!69QL}q?3[;',
      database: 'nousproyec1_surtiled',

      // host: 'localhost',
      // username: 'root',
      // password: '',
      // database: 'surtiled_db',
      // entities: [User],
      autoLoadEntities: true,
      synchronize: false,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'priva230.spindns.com',
        auth: {
          user: 'noreply@nousproyect.com',
          pass: '!DzSS%XhxvO4',
        },
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads/'
    }),
    FcmModule.forRoot({
      firebaseSpecsPath: path.join(__dirname, '../surtiled-rnn-firebase-adminsdk-pc9vs-df158dae77.json'),
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    ChattingModule,
    FavoritesModule,
    FcmTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})

export class AppModule {}
