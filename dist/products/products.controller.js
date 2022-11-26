"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const categories_service_1 = require("../categories/categories.service");
const create_favorite_dto_1 = require("../favorites/dto/create-favorite.dto");
const create_product_dto_1 = require("./dto/create-product.dto");
const products_service_1 = require("./products.service");
let ProductsController = class ProductsController {
    constructor(productsService, categoriesService) {
        this.productsService = productsService;
        this.categoriesService = categoriesService;
    }
    findFeaturedProducts() {
        const products = this.productsService.featuredAll('product');
        return products;
    }
    findFeaturedServices() {
        const products = this.productsService.featuredAll('service');
        return products;
    }
    async uploadImage(body) {
        const result = await this.productsService.imgUpload(body.data, body.format);
        console.log("upload result : ", result);
        return result;
    }
    uploadImageUri(body) {
        console.log('upload uri request: ', body);
        return { path: body };
    }
    async create(createProductDto) {
        const { colorList, category } = createProductDto, info = __rest(createProductDto, ["colorList", "category"]);
        const category_info = await this.categoriesService.findOneSimple(category);
        console.log("product add: ", createProductDto);
        const productInfo = info;
        productInfo['category'] = category_info;
        const product = await this.productsService.create(productInfo);
        await this.productsService.addColor(colorList, product);
        return product;
    }
    findAll() {
        const products = this.productsService.findAll();
        return products;
    }
    filteredProducts(filterList) {
        console.log("products/filter", filterList);
        return this.productsService.filterProducts(filterList);
    }
    async getAllList(type) {
        const list = await this.productsService.getAllList(type);
        return list;
    }
    async findProducts(id) {
        const products = await this.productsService.findProducts(id);
        return products;
    }
    update(id, updateProduct) {
        const product = this.productsService.update(id, updateProduct);
        return product;
    }
    delete(id) {
        return this.productsService.remove(id);
    }
    filteredServices(filterList) {
        console.log("products/filter/services", filterList);
        return this.productsService.filterServices(filterList);
    }
    findServices(id) {
        console.log("products/services/:id");
        const products = this.productsService.findServices(id);
        return products;
    }
    getProduct(id, request) {
        console.log("param: ", id);
        console.log("body: ", request.query);
        const product = this.productsService.findProduct(id, request.query.userid);
        return product;
    }
    setFavorite(info) {
        const result = this.productsService.setFavorite(info);
        return result;
    }
};
__decorate([
    (0, common_1.Get)('/featured/product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findFeaturedProducts", null);
__decorate([
    (0, common_1.Get)('/featured/service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findFeaturedServices", null);
__decorate([
    (0, common_1.Post)('/upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('/uploadUri'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadImageUri", null);
__decorate([
    (0, common_1.Post)('/add'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "filteredProducts", null);
__decorate([
    (0, common_1.Get)('getList/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllList", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findProducts", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('filter/services'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "filteredServices", null);
__decorate([
    (0, common_1.Get)('services/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findServices", null);
__decorate([
    (0, common_1.Get)('/item/:id'),
    (0, common_1.Header)('content-type', 'application/x-www-form-urlencoded'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('favorites'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_favorite_dto_1.CreateFavoriteDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "setFavorite", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        categories_service_1.CategoriesService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map