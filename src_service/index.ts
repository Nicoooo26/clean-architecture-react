import Lifecycle from './lifecycle/index';
import Process from './lifecycle/service/process';
import BackendProxy from './backend_proxy/index';
import NginxDriver from './lifecycle/driver/nginx';
import Config from '../src/config/entity/config';
import FileProvider from '../src/config/provider/file';
import ConfigService from '../src/config/service/config';
import express from 'express';
import path from 'path';
import setupSecurity from './setupSecurity';
import { Server } from 'https';

(async () => {
    // Initialize configuration provider and services
    const provider = new FileProvider('../test/config');
    const config = new ConfigService(provider);
    const driver = new NginxDriver(config);

    // Fetch the service configuration
    const service = await config.get(Config.service);
    const lifecycle = new Lifecycle(service.nginx, { proxy: service.nginx, driver: driver });
    const me = new Process(lifecycle);

    // Proceso (me)
    if (process.env.NODE_ENV === 'production') {
        me.attach();
    }

    // Servidor express
    const app = express();

    await setupSecurity(app);
    // await setupProxy(app);

    // Aplicación estática de react!
    app.use(express.static('build'));

    // Reenviamos todo el tráfico de express al index.html de react
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'app', 'index.html'));
    });

    // Server
    const server: any = app.listen(0, () => {
        console.log(`server started on port ${server.address()!.port}`);
        // onStarted
        lifecycle.onStarted(service);
    });
})();
