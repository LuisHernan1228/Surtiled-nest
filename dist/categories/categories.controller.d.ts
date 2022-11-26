import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(): Promise<Category[]>;
    deleteCategory(id: number): Promise<Category>;
}
