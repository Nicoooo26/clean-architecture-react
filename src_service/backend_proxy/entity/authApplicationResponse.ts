export interface AuthApplicationResponseInterface {
    code?: number;
    token?: string;
    expiresIn?: number;
    dateStart?: Date;
}

export default class AuthApplicationResponse implements AuthApplicationResponseInterface {
    code?: number;
    token?: string;
    expiresIn?: number;
    dateStart?: Date;
    constructor(options: { code?: number; token?: string; expiresIn?: number; dateStart?: Date }) {
        this.code = options.code;
        this.token = options.token;
        this.expiresIn = options.expiresIn;
        this.dateStart = options.dateStart;
    }
}
