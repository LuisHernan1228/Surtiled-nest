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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entity/product.entity");
const typeorm_2 = require("typeorm");
const favorites_service_1 = require("../favorites/favorites.service");
const categories_service_1 = require("../categories/categories.service");
const productColor_entity_1 = require("./entity/productColor.entity");
const fcm_token_service_1 = require("../fcm-token/fcm-token.service");
let ProductsService = class ProductsService {
    constructor(productRepository, productColorRepository, categoryService, favoriteService, fcmTokenService) {
        this.productRepository = productRepository;
        this.productColorRepository = productColorRepository;
        this.categoryService = categoryService;
        this.favoriteService = favoriteService;
        this.fcmTokenService = fcmTokenService;
    }
    async create(createProductDto) {
        createProductDto['createdAt'] = new Date();
        const result = await this.productRepository.save(createProductDto);
        const fcm_data = {
            notifi: {
                title: 'Alerta de producto',
                content: 'Nuevo producto agregado'
            },
            data: {
                title: 'Alerta de producto',
                content: 'Nuevo producto agregado'
            }
        };
        await this.fcmTokenService.sendFCM(fcm_data, 'NEW_PRODUCT');
        return result;
    }
    async imgUpload(data, format) {
        try {
            console.log(data.length, format);
            const arr = format.split('/');
            const fs = require("fs");
            const byteCharacters = Buffer.from(data, 'base64');
            console.log('byteCharacters: ', byteCharacters);
            const filename = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + '.' + arr[1];
            fs.writeFile("uploads/" + filename, byteCharacters, (err) => {
                if (err) {
                    console.log(err);
                    return { status: false };
                }
                console.log('data');
                return { path: filename };
            });
            return { path: filename };
        }
        catch (err) {
            console.log('upload failed: ', err);
        }
    }
    async findOne(id) {
        return this.productRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.productRepository.find({
            relations: ['category'],
        });
    }
    async addColor(list, product) {
        return Promise.all(list && list.map(item => {
            return this.productColorRepository.insert({ color: item, product });
        }));
    }
    async findProducts(id) {
        try {
            const res = await this.categoryService.findOne(id);
            const products = res.products.filter(item => item.type === 'product');
            const result = await Promise.all(products.map(async (product) => {
                const colorList = await this.productColorRepository.find({
                    where: { product: { id: product.id } }
                });
                return Object.assign(Object.assign({}, product), { colorList: colorList.map(item => item.color) });
            }));
            return result;
        }
        catch (err) {
            console.log("findServices Error!");
        }
    }
    async filterProducts(filtterList) {
        const { category, lookfor, max, min } = filtterList;
        let productList = [];
        let result = [];
        switch (lookfor) {
            case 'popular':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'score': 'DESC' }
                });
                break;
            case 'new':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'createdAt': 'DESC' }
                });
                break;
            case 'old':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'createdAt': 'ASC' }
                });
                break;
            case 'higher':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'price': 'DESC' }
                });
                break;
            case 'lower':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'product' },
                    order: { 'price': 'ASC' }
                });
                break;
            default:
                break;
        }
        result = productList;
        if (min > 0)
            result = productList.filter((item) => item.price > min);
        if (max > 0)
            result = result.filter((item) => item.price < max);
        return result.filter(item => item.active === true);
    }
    async filterServices(filtterList) {
        const { category, lookfor, max, min } = filtterList;
        let productList = [];
        let result = [];
        switch (lookfor) {
            case 'popular':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'score': 'DESC' }
                });
                break;
            case 'new':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'createdAt': 'DESC' }
                });
                break;
            case 'old':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'createdAt': 'ASC' }
                });
                break;
            case 'higher':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'price': 'DESC' }
                });
                break;
            case 'lower':
                productList = await this.productRepository.find({
                    relations: ['category'],
                    where: { category: { id: category }, type: 'service' },
                    order: { 'price': 'ASC' }
                });
                break;
            default:
                break;
        }
        result = productList;
        console.log("product list: ", result);
        if (min > 0)
            result = productList.filter((item) => item.price > min);
        if (max > 0)
            result = result.filter((item) => item.price < max);
        return result.filter(item => item.active === true);
    }
    async findServices(id) {
        try {
            const res = await this.categoryService.findOne(id);
            const products = res.products.filter(item => item.type === 'service');
            const result = await Promise.all(products.map(async (product) => {
                const colorList = await this.productColorRepository.find({
                    where: { product: { id: product.id } }
                });
                return Object.assign(Object.assign({}, product), { colorList: colorList.map(item => item.color) });
            }));
            return result;
        }
        catch (err) {
            console.log("findServices Error!");
        }
    }
    async findProduct(id, userid) {
        let product = await this.productRepository.findOne({
            relations: ['productColor'],
            where: { id }
        });
        const colorList = product.productColor.map(item => item.color);
        const { productColor } = product, data = __rest(product, ["productColor"]);
        data['favorite'] = await this.favoriteService.getFavorite({ productid: id, userid });
        data['colorList'] = colorList;
        console.log("getProduct: ", data);
        return data;
    }
    async featuredAll(type) {
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
    async update(id, data) {
        const { colorList } = data, rest = __rest(data, ["colorList"]);
        const color_list = await this.productColorRepository.find({
            where: { product: { id } }
        });
        if (color_list.length > 0)
            await Promise.all(color_list.map(async (item) => {
                await this.productColorRepository.delete(item.id);
            }));
        const product = await this.productRepository.findOne({ where: { id } });
        if (colorList && colorList.length > 0)
            await this.addColor(colorList, product);
        return this.productRepository.update({ id }, rest);
    }
    async updateBalance(id, data) {
        return this.productRepository.update({ id }, data);
    }
    remove(id) {
        return this.productRepository.update(id, { active: false });
    }
    async setFavorite(info) {
        const { productid, userid } = info;
        const product = await this.productRepository.findOne({ where: { id: productid } });
        return this.favoriteService.setFavorite({ userid, product });
    }
    async getAllList(type) {
        try {
            const list = await this.productRepository.find({
                relations: ['productColor'],
                where: { type },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    productColor: {
                        color: true,
                        id: true
                    }
                }
            });
            return list;
        }
        catch (err) {
            return { status: false };
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productColor_entity_1.ProductColor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService,
        favorites_service_1.FavoritesService,
        fcm_token_service_1.FcmTokenService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map