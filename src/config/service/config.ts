import { ConfigProviderInterface } from './provider/config';
import Config from '../entity/config';
import * as fs from 'fs';

// Interface
export interface ConfigInterface {
    get(config : Config): Promise<any>;
    //service(): Promise<Object>;
    //application(): Promise<Object>;
}
export abstract class AbstractConfig implements ConfigInterface {
    private provider: ConfigProviderInterface;
    private env: NodeJS.ProcessEnv = process.env;
    //Contructor (?) se pasa la ruta y se tiene que hacer un routeProvider para que busque la ruta y devuelva el objeto

    constructor(provider: ConfigProviderInterface) {
        this.provider = provider;
    }

    // public async service(): Promise<Object> {
    //     return this._mergeConfig(this.provider.get('default', 'service'), this.provider.get(this.env.NODE_ENV, 'service'), this._getEnviromentVariables(/^NODE_/));
    // }

    // public async application(): Promise<Object> {
    //     return this._mergeConfig(this.provider.get('default', 'application'), this.provider.get(this.env.NODE_ENV, 'application'), this._getEnviromentVariables(/^REACT_APP_/));
    // }

    public async get(config: Config): Promise<any> {
        return this._mergeConfig(this.provider.get('default', config), this.provider.get(this.env.NODE_ENV, config), this._getEnviromentVariables(config));
    }
    
    // Obtiene los valores solicitados de las variables de entorno del proceso
    private _getEnviromentVariables = (config: Config) => {
        const filter = (config === Config.application) ? new RegExp(`^REAC_APP_`) : new RegExp(`^NODE_`)
        const env: NodeJS.ProcessEnv = this.env;
        let varc = {};
        // Asignamos los valores finales a las VE de tipo fichero
        Object.keys(env).map(async (prop) => {
            if (prop.endsWith('_FILE')) {
                //
                env[prop.replace(/_FILE$/, '')] = await fs.readFileSync(`${env[prop]}`, { encoding: 'utf-8' }).toString();
                delete env[prop];
            }
        });

        Object.keys(env)
            .filter((x) => filter.test(x))
            .forEach((var_name) => {
                const name: string = var_name.replace(filter, '');
                const value: string | undefined = env[var_name];
                const levels: string[] = name.split('__').map((x) => x.toLowerCase());
                let target: any;
                levels.forEach((level, index) => {
                    // Siguiente elemento
                    let isObject = isNaN(Number(levels[index + 1]));
                    // Punteros (marca el objetivo como el objeto de configuración)
                    if (index === 0) target = varc;
                    // Ultimo elemento (añade el valor indicado en la variable de entorno)
                    if (index === levels.length - 1)
                        // if(level === "text") value = fs.readFileSync(`${value}`).toString();
                        target[level] = value;
                    // Creación de propiedades (crea un objeto o un array)
                    else if (isNaN(level as any)) {
                        //debugger;
                        // Elemento ya existente?
                        if (!target[level]) {
                            // Objeto
                            if (isObject) target[level] = {};
                            // Array
                            else target[level] = [];
                        }

                        // Target
                        target = target[level];
                    }
                    // Elemento array
                    else {
                        if (!target[level]) {
                            if (isObject) target.splice(level, 0, {});
                            // Array
                            else target.splice(level, 0, []);
                        }
                        target = target[level];
                    }
                });
                //target = value;
                //console.log(levels);
            });
        return varc;
    };

    // Combina varios objetos de configuración
    private _mergeConfig(target: any, ...sources: any[]): any {
        // Object helper
        function isObject(item: any) {
            return item && typeof item === 'object' && !Array.isArray(item);
        }

        if (!sources.length) return target;
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
            for (const key in source) {
                if (isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this._mergeConfig(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return this._mergeConfig(target, ...sources);
    }
}

// Implementación
class ConfigService extends AbstractConfig {}

export default ConfigService;
