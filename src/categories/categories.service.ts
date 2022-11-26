import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Category } from './entity/category.entity';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// import { Categories, CategoriesDocument } from './schemas/categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { Product } from 'src/products/entity/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    // @InjectRepository(Product)
    // private productsRepository: Repository<Product>
  ) {}

  async create (createCategoryDto: any) {
    // const createdCategorie = new this.categoriesRepository(createCategoryDto);
    // const data = { label: 'test', imgUrl: 'sdf', type: 'product'}
    // const result = await this.categoriesRepository.create(data);
    const result = await this.categoriesRepository.save(createCategoryDto);
    console.log("category create result: ", result)
    return result
  }

  findOne(id: number): Promise<Category | undefined> {
    // this.categoriesRepository.find().exec();
    return this.categoriesRepository.findOne({
      relations: ['products'],
      where: {id, products: { active: true}}
    });
  }

  findOneSimple(id: number): Promise<Category | undefined> {
    // this.categoriesRepository.find().exec();
    return this.categoriesRepository.findOne({
      where: {id}
    });
  }

  async findCategories(): Promise<Category[]>{
    return this.categoriesRepository.find({where: {active: true}});
    // return this.categoriesRepository.find({
    //   relations: ['products'],
    // });
  }
  
  async remove(id: number): Promise<any> {
    // // @ts-ignore
    // return this.categoriesRepository.delete(id)
    return this.categoriesRepository.update(id, {active: false})
  }
}
