import axios, { AxiosStatic } from 'axios';
import { uuid } from 'uuidv4';
import { DiscoverPayload, HidePayload } from '../entity/nginx_payload';

import ApplicationGateway from '../service/driver/applicationGateway';

class NginxDriver implements ApplicationGateway {
    private _proxyConfig: any;
    private _client: AxiosStatic;
    constructor(proxy: any) {
        this._proxyConfig = proxy;
        this._client = axios;
    }

    async discover() {
        try {
            const response = await this._client.post(this._proxyConfig.discover_uri, DiscoverPayload.createFromObject(this._proxyConfig.payload), this._createHeaders());
            if (response.status === 200) {
                return true;
            }
            return false; // No existe el recurso
        } catch (ex) {
            return false; // No existe el recurso
        }
    }
    async hide() {
        try {
            const response = await this._client.post(this._proxyConfig.hide_uri, HidePayload.createFromObject(this._proxyConfig.payload), this._createHeaders());
            if (response.status === 200) {
                return true;
            }
            return false; // No existe el recurso
        } catch (ex) {
            return false; // No existe el recurso
        }
    }
    private _createHeaders(): Object {
        return {
            // CORS
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',

            // Cabeceras
            'x-p-traceroute': uuid(),
            //'x-p-svcname': this._proxyConfig('_')[0],
            'x-p-svcname': this._proxyConfig.payload.application_name('_')[0],
            'x-p-username': 'SYSTEM',
        };
    }
    // async configure_nginx_api(isDiscover: boolean): Promise<boolean> {
    //     // Montamos la URI, con la parte de configuración y otra fija
    //     let endpoint = isDiscover ? this._proxyConfig.discover_uri : this._proxyConfig.hide_uri;
    //     let payload = isDiscover
    //         ? JSON.stringify({
    //               EntityName: this.entityName,
    //               Prefix: this._proxyConfig.payload.prefix,
    //               Scheme: 'http',
    //               Port: this.server.address().port,
    //               Extra: this._proxyConfig.payload.extra,
    //           })
    //         : JSON.stringify({
    //               tagSearch: this.entityName,
    //           });

    //     let headers = ;

    //     try {
    //         const response = await axios.post(endpoint, payload, { headers });
    //         if (response.status === 200) {
    //             return true;
    //         }
    //         return false; // No existe el recurso
    //     } catch (ex) {
    //         return false; // No existe el recurso
    //     }
    // }
}

export default NginxDriver;
