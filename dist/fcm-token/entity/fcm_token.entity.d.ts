import { User } from 'src/users/entity/user.entity';
export declare class FcmToken {
    id: number;
    role: string;
    token: string;
    user: User[];
}
