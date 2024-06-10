import MockDriver from '../driver/mockDriver';
import ApplicationLifeCycle from '../service/lifecycle';

const config = {
    // Configuración nginx
    nginx: {
        discover_uri: 'http://localhost/nginxproxy/discover',
        hide_uri: 'http://localhost/nginxproxy/hide',
        payload: {
            entity_name: 'prueba',
            prefix: '',
            scheme: 'http',
            port: '',
            extra: '',
            tagSearch: '',
        },
    },
    // Security Headers
    securityHeaders: {
        // Strict-Transport-Security
        // "preload", which is necessary for inclusion in all major web browsers' HSTS preload lists, like Chromium, Edge, and Firefox.
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

        // X-Frame-Options
        'X-Frame-Options': 'SAMEORIGIN', // "DENY"

        // X-Content-Type-Options
        // "nosniff" Blocks a request if the request destination is of type style and the MIME type is not text/css,
        // or of type script and the MIME type is not a JavaScript MIME type.
        'X-Content-Type-Options': 'nosniff',

        // Content-Security-Policy
        'Content-Security-Policy': "default-src 'self';style-src 'self' fonts.googleapis.com;font-src 'self' fonts.gstatic.com;", // connect-src 'self' https://srfrt-001.contesta.es
    },
};
const driver = new MockDriver(config);
const lifecycle = new ApplicationLifeCycle(config.nginx, { proxy: config.nginx, driver: driver });
test('Prueba de discover', () => {
    expect(lifecycle.driver.discover()).toBe(true);
});

test('Prueba de hide', () => {
    expect(lifecycle.driver.hide()).toBe(true);
});
const driverFalse = new MockDriver();
const lifecycleFalse = new ApplicationLifeCycle(config.nginx, { proxy: config.nginx, driver: driverFalse });

test('Prueba de discover False', () => {
    expect(lifecycleFalse.driver.discover()).toBe(false);
});

test('Prueba de hide False', () => {
    expect(lifecycleFalse.driver.hide()).toBe(false);
});

const driverException = new MockDriver('error');
const lifecycleException = new ApplicationLifeCycle(config.nginx, { proxy: config.nginx, driver: driverException });

test('Prueba de discover Exception', () => {
    expect(lifecycleException.driver.discover()).toBe(false);
});

test('Prueba de hide Exception', () => {
    expect(lifecycleException.driver.hide()).toBe(false);
});
