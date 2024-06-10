
import ApplicationGatewayInterface from './driver/applicationGateway';

export interface LifeCycleInterface {
    configurations: any;
    onStarted(configurations: any, server: any): void;
    onStopping(options: any): void;
}

export abstract class AbstractApplicationLifeCycle implements LifeCycleInterface {
    configurations: any;
    private _proxy: any;
    driver: ApplicationGatewayInterface;

    constructor(configurations: any, options: { proxy: any; driver: ApplicationGatewayInterface }) {
        this.configurations = configurations;
        this._proxy = options.proxy;
        this.driver = options.driver;
    }
    onStarted(configurations: any): void {
        // Actualizamos el fichero nginx para poder configurarnos y que todo el mundo pueda escucharnos
        if (this._proxy) {
            this._proxy.payload.entityName = process.env.ENTITY_NAME || this._proxy.payload.prefix;
            this.driver.discover();
            return;
        }
    }

    onStopping(options: any): void {
        console.log(`101: ${options.name}`);
        if (options.exit && this._proxy) {
            console.log(`102: ${options.name}`);
            this.driver.hide();
            this._proxy = null;
            process.exit();
            // this.driver.hide().then(() => {
            //     this._proxy = null;
            //     process.exit();
            // });
        }
    }
}

export class ApplicationLifeCycle extends AbstractApplicationLifeCycle {}

export default ApplicationLifeCycle;
