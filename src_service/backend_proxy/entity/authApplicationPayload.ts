export interface AuthApplicationPayloadInterface {
    accountName: string;
    credentials: string;
}

export default class AuthApplicationPayload implements AuthApplicationPayloadInterface {
    accountName: string;
    credentials: string;
    constructor(accountName: string, credentials: string) {
        this.accountName = accountName;
        this.credentials = credentials;
    }
}
