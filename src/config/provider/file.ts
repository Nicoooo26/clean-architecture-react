import Config from '../entity/config';
import { ConfigProviderInterface } from '../service/provider/config';

export default class FileProvider implements ConfigProviderInterface {
    root: string;
    constructor(root: string) {
        this.root = root;
    }

    async get(enviroment: String, type: Config): Promise<Object> {
        return await import(`${this.root}/${enviroment}/${type}`).then((module) => module.default);
    }
}
