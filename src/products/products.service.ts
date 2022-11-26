import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Products, ProductsDocument } from './schemas/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { FavoritesService } from 'src/favorites/favorites.service';
import { CreateFavoriteDto } from 'src/favorites/dto/create-favorite.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductColor } from './entity/productColor.entity';
import { FcmTokenService } from 'src/fcm-token/fcm-token.service';
// import fs from 'fs'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
    // @InjectRepository(Category)
    // private categoryRepository: Repository<Category>,
    private categoryService: CategoriesService,
    private favoriteService: FavoritesService,
    private fcmTokenService: FcmTokenService
  ) {}

  async create (createProductDto: any) {
    createProductDto['createdAt'] = new Date()
    const result = await this.productRepository.save(createProductDto)

    const fcm_data = {
      notifi: {
        title: 'Alerta de producto',
        content: 'Nuevo producto agregado'
      },
      data: {
        title: 'Alerta de producto',
        content: 'Nuevo producto agregado'
      }
    }
    await this.fcmTokenService.sendFCM(fcm_data, 'NEW_PRODUCT')
      // .then(res => res).catch(e => console.log(e));
    return result
  }

  async imgUpload (data: string, format: string) {
    try {
      console.log(data.length, format)
      const arr = format.split('/')
      const fs = require("fs");
      const byteCharacters = Buffer.from(data, 'base64');
      console.log('byteCharacters: ', byteCharacters)
      
      const filename = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + '.' + arr[1]
      fs.writeFile("uploads/" + filename, byteCharacters, (err) => {
        if (err) {
          console.log(err)
          return { status: false}
        }
        console.log('data')
        return {path: filename}
      })
      return {path: filename}
    } catch (err) {
      console.log('upload failed: ', err)
    }
  }

  async findOne(id: number): Promise<Product | undefined> {
    return this.productRepository.findOne({where: {id}});
  }

  async findAll(): Promise<Product[]>{
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      relations: ['category'],
      // where: { category: {id: i}}
    });
  }

  async addColor(list: string[], product: any) {
    return Promise.all(list && list.map(item => {
      return this.productColorRepository.insert({color: item, product})
    }))
  }

  async findProducts(id: number): Promise<any>{
    try {
      const res = await this.categoryService.findOne(id)
      const products = res.products.filter(item => item.type === 'product')
      const result = await Promise.all(products.map(async(product) => {
        const colorList = await this.productColorRepository.find({
          where: {product: {id: product.id}}
        })
        return {...product, colorList: colorList.map(item => item.color)}
      }))
      return result
    } catch(err) {
      console.log("findServices Error!")
    }
  }

  async filterProducts(filtterList: any) {
    const { category, lookfor, max, min} = filtterList
    let productList: any = [];
    let result: any = []

    switch(lookfor) {
      case 'popular':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'product'},
          order: {'score': 'DESC'}
        })
        break;
      case 'new':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'product'},
          order: {'createdAt': 'DESC'}
        })
        break;
      case 'old':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'product'},
          order: {'createdAt': 'ASC'}
        })
        break;
      case 'higher':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'product'},
          order: {'price': 'DESC'}
        })
        break;
      case 'lower':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'product'},
          order: {'price': 'ASC'}
        })
        break;
      default:
        break;
    }

    result = productList
    if(min > 0)
      result = productList.filter((item: any) => item.price > min)
    if(max > 0)
      result = result.filter((item: any) => item.price < max)
    
    return result.filter(item => item.active === true)
  }

  async filterServices(filtterList: any) {
    const { category, lookfor, max, min} = filtterList
    let productList: any = [];
    let result: any = []

    switch(lookfor) {
      case 'popular':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'service'},
          order: {'score': 'DESC'}
        })
        break;
      case 'new':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'service'},
          order: {'createdAt': 'DESC'}
        })
        break;
      case 'old':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'service'},
          order: {'createdAt': 'ASC'}
        })
        break;
      case 'higher':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'service'},
          order: {'price': 'DESC'}
        })
        break;
      case 'lower':
        productList = await this.productRepository.find({
          relations: ['category'],
          where: {category: {id: category}, type: 'service'},
          order: {'price': 'ASC'}
        })
        break;
      default:
        break;
    }

    result = productList
    console.log("product list: ", result)
    if(min > 0)
      result = productList.filter((item: any) => item.price > min)
    if(max > 0)
      result = result.filter((item: any) => item.price < max)
    
    return result.filter(item => item.active === true)
  }

  async findServices(id: number): Promise<any>{
    try {
      const res = await this.categoryService.findOne(id)
      const products = res.products.filter(item => item.type === 'service')
      const result = await Promise.all(products.map(async(product) => {
        const colorList = await this.productColorRepository.find({
          where: {product: {id: product.id}}
        })
        return {...product, colorList: colorList.map(item => item.color)}
      }))
      return result
    } catch(err) {
      console.log("findServices Error!")
    }
  }

  async findProduct(id: number, userid: number): Promise<any>{
    let product = await this.productRepository.findOne({
      // relations: ['review'],
      relations: ['productColor'],
      where: { id }
    });
    const colorList = product.productColor.map(item => item.color)
    const {productColor, ...data} = product
    // product['favorite'] = await this.favoriteService.getFavorite({productid: id, userid})
    // relation add
    data['favorite'] = await this.favoriteService.getFavorite({productid: id, userid})
    data['colorList'] = colorList
    console.log("getProduct: ", data)
    return data
  }

  async featuredAll(type): Promise<Product[]>{
    // this.productRepository.createQueryBuilder('product')
    //   .innerJoin('product.categoryId', 'category')
    return this.productRepository.find({
      relations: ['category'],
      where: { featured: true, type, active: true },
      select: {
        id: true,
        name: true,
        imageName: true,
        price: true,
        category: {
          id: true
        }
      }
    });
  }

  async update(id: number, data: any) {
    const {colorList, ...rest} = data
    const color_list = await this.productColorRepository.find({
      where: {product: {id}}
    })
    if(color_list.length > 0)
      await Promise.all(color_list.map(async(item) => {
        await this.productColorRepository.delete(item.id)
      }))

    const product = await this.productRepository.findOne({where: { id }})
    if(colorList && colorList.length > 0)
      await this.addColor(colorList, product)
    return this.productRepository.update({id}, rest)
  }

  async updateBalance(id: number, data: any) {
    
    return this.productRepository.update({id}, data)
  }

  remove(id: number) {
    return this.productRepository.update(id, {active:false})
  }

  async setFavorite (info: CreateFavoriteDto) {
    const { productid, userid } = info
    const product = await this.productRepository.findOne({where: {id: productid}});
    return this.favoriteService.setFavorite({userid, product})
  }

  async getAllList(type: string) {
    try {
      const list = await this.productRepository.find({
        relations: ['productColor'],
        where: {type},
        select: {
          id: true,
          name: true,
          price: true,
          // type: true,
          productColor: {
            color: true,
            id: true
          }
        }
      })
      return list
    } catch (err) {
      return { status: false}
    }
  }
}
