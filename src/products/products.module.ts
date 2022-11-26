import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoriesModule } from 'src/categories/categoies.module';
import { Category } from 'src/categories/entity/category.entity';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ProductColor } from './entity/productColor.entity';
import { FcmTokenModule } from 'src/fcm-token/fcm-token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductColor]),
    CategoriesModule,
    FavoritesModule,
    FcmTokenModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
