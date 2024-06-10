// responseIntercept
import type { NextFunction, Request, RequestHandler, Response, Express } from 'express';
import { uuid } from 'uuidv4';
import * as http from 'http';
import BackendRepository from '../repository/backendRepository';
import AuthApplicationDriverInterface from './driver/auth';
import AuthApplicationPayload from '../entity/authApplicationPayload';
// import AuthApplicationResponse, { AuthApplicationResponseInterface } from '../entity/authApplicationResponse';
const { createProxyMiddleware } = require('http-proxy-middleware');

// Interface
export interface BackendProxyInterface {
    addToExpress(express: Express, payload: AuthApplicationPayload): void;
}

// Lógica abstracta
export abstract class AbstractBackendProxy implements BackendProxyInterface {
    appname: string;
    endpoint: string;
    tokenRepository: BackendRepository;
    middleware: RequestHandler;
    driver: AuthApplicationDriverInterface;
    // auth: AuthApplicationResponseInterface = new AuthApplicationResponse({});

    constructor(appname: string, endpoint: string, tokenRepository: BackendRepository, driver: AuthApplicationDriverInterface) {
        this.appname = appname;
        this.endpoint = endpoint;
        this.tokenRepository = tokenRepository;
        this.driver = driver;

        this.middleware = this._proxy(this.appname, this.endpoint);
    }

    addToExpress = (express: Express, authPayload: AuthApplicationPayload): void => {
        // Middleware /api
        express.use('/api', this._token(authPayload));
        express.use('/api', this._proxy(this.appname, this.endpoint));
    };

    // Realiza la llamada al proxy
    private _proxy = (appname: string, endpoint: string): RequestHandler => {
        return createProxyMiddleware({
            target: endpoint,
            changeOrigin: true,
            //selfHandleResponse : true,    // Para el uso de onResponseRes con responseInterceptor
            pathRewrite: {
                '^/api': '',
            },
            // Req
            onProxyReq: (proxyReq: http.ClientRequest, req: Request, res: Response) => {
                // CROS
                proxyReq.setHeader('Accept', req.header('Accept') || 'application/json');
                proxyReq.setHeader('Access-Control-Allow-Origin', '*');
                proxyReq.setHeader('Content-Type', req.header('Content-Type') || 'application/json');

                // Cabeceras
                proxyReq.setHeader('x-p-traceroute', uuid());
                proxyReq.setHeader('x-p-appname', appname);
                proxyReq.setHeader('x-p-apptoken', res.locals.tokenapplication);
                proxyReq.setHeader('x-p-username', req.header('x-p-username') || 'NOUSER');
                proxyReq.setHeader('Authorization', req.header('Authorization')!);
            },
            // Response
            //onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            //    console.log(`onProxyRes: ${req.path}`);
            //    return responseBuffer;
            //}),
        });
    };

    // Obtiene el token del aplicativo
    private _token(payload: AuthApplicationPayload): (req: Request, res: Response, next: NextFunction) => Promise<void> {
        return async (req: Request, res: Response, next: NextFunction) => {
            // Obtengo el token del repositorio
            let token = this.tokenRepository.getToken();

            // Tengo token en el repositorio
            if (token) {
                // Caducidad
                if (token.dateStart && new Date(Date.parse(token.dateStart.toString()) + token.expiresIn! * 60000).getTime() - new Date().getTime() < 0) {
                    // Delete token retorna undefined
                    token = this.tokenRepository.deleteToken();
                }
            }
            // Utilizo el driver para obtener un nuevo token
            if (!token) {
                let tokenReponse = await this.driver.doLogin(payload); // Obtenemos el token de aplicativo
                // Compruebo el resultado
                if (tokenReponse.code === 200) {
                    this.tokenRepository.saveToken(tokenReponse);
                } else {
                    throw Error(`Application auth failed: ${tokenReponse}`);
                }
            }

            // Añadimos el valor del token a locals dentro de response
            if (token) res.locals.tokenapplication = token.token;

            // Siguiente acción middleware
            next();
        };
    }
}

// Implementación
class BackendProxy extends AbstractBackendProxy {}

export default BackendProxy;
