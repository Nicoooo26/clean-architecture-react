import { uuid } from 'uuidv4';
import AuthApplicationDriverInterface from '../service/driver/auth';
import axios from 'axios';
import AuthApplicationPayload from '../entity/authApplicationPayload';
import AuthApplicationResponse from '../entity/authApplicationResponse';

export class BackendDriver implements AuthApplicationDriverInterface {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async doLogin(payload: AuthApplicationPayload): Promise<AuthApplicationResponse> {
        // Nombre del aplicativo
        let appname = payload.accountName;

        // Respuesta por defecto
        var response: AuthApplicationResponse = new AuthApplicationResponse({ code: 500, expiresIn: -1, dateStart: new Date() });

        try {
            let headers = {
                // CROS
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',

                // Cabeceras
                //'x-p-traceroute': uuidv4(),
                'x-p-traceroute': uuid(),
                'x-p-appname': appname,
                'x-p-username': 'NOUSER',
                'x-p-apptoken': '',
            };

            // Post
            const req = await axios.post(this.endpoint, payload, { headers });

            // Response
            response = new AuthApplicationResponse({
                code: req.data.code,
                token: req.data.data.token,
                expiresIn: req.data.data.expiresIn,
                dateStart: req.data.data.dateStart,
            });

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
