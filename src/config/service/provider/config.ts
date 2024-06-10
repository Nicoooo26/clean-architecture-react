import Config from "../../entity/config";

export interface ConfigProviderInterface {
    get(enviroment: String, type: Config): Promise<Object>;
}