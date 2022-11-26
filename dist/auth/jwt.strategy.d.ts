import { Strategy } from 'passport-jwt';
declare const JwtStretegy_base: new (...args: any[]) => Strategy;
export declare class JwtStretegy extends JwtStretegy_base {
    constructor();
    validate(payload: any): Promise<{
        userid: any;
        username: any;
    }>;
}
export {};
