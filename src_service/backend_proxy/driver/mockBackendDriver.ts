import AuthApplicationDriverInterface from '../service/driver/auth';
import AuthApplicationPayload from '../entity/authApplicationPayload';
import AuthApplicationResponse from '../entity/authApplicationResponse';

export class AuthBackendDriver implements AuthApplicationDriverInterface {
    private _accountName = 'appname';
    private _credentials = 'appcredentials';
    private _token = 'token';

    async doLogin(payload: AuthApplicationPayload): Promise<AuthApplicationResponse> {
        // Respuesta por defecto
        // {
        //     code: 500,
        //     token: null,
        //     expiresIn: -1,
        //     dateStart: new Date(),
        // }
        var response: AuthApplicationResponse = new AuthApplicationResponse({ code: 500, expiresIn: -1, dateStart: new Date() });
        try {
            // Comprobamos las credenciales del aplicativo
            if (this._accountName === payload.accountName && this._credentials === payload.credentials) {
                // Response
                response = new AuthApplicationResponse({
                    code: 200,
                    token: this._token,
                    expiresIn: 900,
                    dateStart: new Date(),
                });
            } else {
                throw Error(`Invalid application credentials`);
            }

            // Retorno
            return response;
        } catch (err: any) {
            // Error
            let status = err.toJSON().status;
            if (status) response.code = status;
            return response;
        }
    }
}
