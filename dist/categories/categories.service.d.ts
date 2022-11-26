import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    create(createCategoryDto: any): Promise<any>;
    findOne(id: number): Promise<Category | undefined>;
    findOneSimple(id: number): Promise<Category | undefined>;
    findCategories(): Promise<Category[]>;
    remove(id: number): Promise<any>;
}
