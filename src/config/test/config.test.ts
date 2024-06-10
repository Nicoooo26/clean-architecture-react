import Config from '../entity/config';
import FileProvider from '../provider/file';
import ConfigService from '../service/config';

const provider = new FileProvider('../test/config');
const config = new ConfigService(provider);

//Generamos unas variables de entorno de prueba
process.env.REACT_APP_SECRET_FILE = 'file.txt';
process.env.NODE_ENCRYPTED_AUTHENTICATE__TEXT = '123456';
process.env.NODE_LIST__0__PROPERTY_A = '1';
process.env.NODE_LIST__0__PROPERTY_B = '2';
process.env.NODE_LIST__1__0__PROPERTY_A = '3';
process.env.NODE_FOO__VAR__FOO = 'value';
process.env.REACT_TEST = 'No';

test('funciona correctamente el metodo application', async () => {
    // Llama al método application() y espera a que se resuelva la promesa
    const application = await config.get(Config.application);
    
    // Verifica si la respuesta tiene la propiedad "navigation"
    expect(application).toHaveProperty('navigation');

    // Verifica otros aspectos de la respuesta si es necesario
});

test('funciona correctamente el metodo service', async () => {
    // Llama al método service() y espera a que se resuelva la promesa
    const service = await config.get(Config.service);
    console.log(service);
    // Verifica si la respuesta tiene la propiedad "authenticate"
    expect(service).toHaveProperty('authenticate');
});

test('combina correctamente dos objetos de configuración', () => {
    // Define dos objetos de configuración para combinar
    const defaultConfig = { key1: 'value1', key2: { nestedKey: 'nestedValue' } };
    const environmentConfig = { key2: { nestedKey2: 'nestedValue2' }, key3: 'value3' };

    // Llama al método _mergeConfig() para combinar los objetos de configuración
    const mergedConfig = config['_mergeConfig'](defaultConfig, environmentConfig);

    // Verifica si los objetos de configuración se han combinado correctamente
    expect(mergedConfig).toEqual({ key1: 'value1', key2: { nestedKey: 'nestedValue', nestedKey2: 'nestedValue2' }, key3: 'value3' });
});
