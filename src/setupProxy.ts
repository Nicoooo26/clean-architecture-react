import BackendProxy from '../src_service/backend_proxy/service/proxy';
import Config from './config/entity/config';
import FileProvider from './config/provider/file';
import ConfigService from './config/service/config';
import BackendRepository from '../src_service/backend_proxy/repository/backendRepository';
import { BackendDriver } from '../src_service/backend_proxy/driver/axiosBackendDriver';
import type { Express } from 'express';
import AuthApplicationPayload from '../src_service/backend_proxy/entity/authApplicationPayload';

// const BackendProxy = require('../src_service/backend_proxy/service/proxy');
// const Config = require('./config/entity/config');
// const FileProvider = require('./config/provider/file');
// const ConfigService = require('./config/service/config');
// const BackendRepository = require('../src_service/backend_proxy/repository/backendRepository');
// const { BackendDriver } = require('../src_service/backend_proxy/driver/axiosBackendDriver');
// const { Express } = require('express');
// const AuthApplicationPayload = require('../src_service/backend_proxy/entity/authApplicationPayload');

module.exports = async function (app: Express) {
    // Proveedor de configuración
    const provider = new FileProvider('@config');

    // Servicio de configuraciones
    const configService = new ConfigService(provider);

    // Configuración de aplicación
    const conf = await configService.get(Config.service);
    console.log(conf);

    // Auth payload
    if ('API_URI' in conf) {
        // NODE_LOGIN_SERVER_URI

        // Repositorio de tokens de aplicación
        const tokenRepository = new BackendRepository();
        // Backend driver
        const driver = new BackendDriver(conf.API_URI);
        // Crear la credencial para el aplicartivo
        let authPayload = new AuthApplicationPayload(conf.authenticate.accountname, conf.authenticate.credentials);
        // Crearmos el Backend Proxy
        const proxy = new BackendProxy(conf.authenticate.accountname, conf.login_server_name, tokenRepository, driver);
        // Añadimos en express
        proxy.addToExpress(app, authPayload);
    }
};
