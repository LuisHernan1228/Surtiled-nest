export declare class CreateProductDto {
    readonly name: string;
    readonly code: string;
    category: number;
    readonly characteristic: string;
    readonly imageName: string;
    readonly price: number;
    readonly balance: number;
    readonly color?: string;
    readonly colorList: string[];
    readonly featured: boolean;
    readonly type: string;
    readonly score: number;
    readonly reviewNumber: number;
    readonly active: boolean;
}
