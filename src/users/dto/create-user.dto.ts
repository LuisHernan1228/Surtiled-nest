export class CreateUserDto {
    readonly userid: string;
    readonly imageName?: string;
    readonly names: string;
    readonly surnames?: string;
    readonly typeId?: string;
    readonly idNumber?: string;
    readonly cell?: string;
    readonly conventional?: string;
    readonly residence?: string;
    readonly email?: string;
    password?: string;
    readonly role: string;
}
