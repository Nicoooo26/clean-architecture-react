// React Proxy
import Config from '../src/config/entity/config';
import FileProvider from '../src/config/provider/file';
import ConfigService from '../src/config/service/config';
import type { Express } from 'express';

const provider = new FileProvider('@config');
const conf = new ConfigService(provider);

const setupSecurity = async (app: Express) => {
    // Configuracion
    const service = await conf.get(Config.service);

    // Security Middleware, add required headers for security reactions
    if (service.securityHeaders) {
        app.use('*', (req, res, next) => {
            res.set(service.securityHeaders);
            next();
        });
    }
};

export default setupSecurity;
