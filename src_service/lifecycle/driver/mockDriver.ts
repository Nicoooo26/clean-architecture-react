import ApplicationGateway from '../service/driver/applicationGateway';

class MockDriver implements ApplicationGateway {
    private _proxyConfig?: any;

    constructor(proxy?: any) {
        this._proxyConfig = proxy;
    }

    discover() {
        try {
            const response = {
                code: this._proxyConfig ? 200 : 0,
                success: true,
                message: 'Cuenta autenticada correctamente',
                detail: 'La cuenta credentialmanager ha sido autenticada de forma correcta.',
                exception: this._proxyConfig === 'error' ? 'fallo' : 'correcto',
                data: {
                    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMGU0ZGFjNC02NWFlLTQ0MzctNmU1NC0wOGRiZTljMjlmZmYiLCJpYXQiOjE3MDMxNzE5NjMsImp0aSI6ImJjNGMyNGY2LWVkNGItNGVmNy1iZThlLTc5Njc3ODY0YTI1ZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJjcmVkZW50aWFsbWFuYWdlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6W3siS2V5IjoiZjYwMjE0MjEtNWQxNy00YjQxLTIyYjEtMDhkYjAyYWI1NTlkIiwiVmFsdWUiOiJhdXRlbnRpY2FyIn1dLCJjbGFpbSI6W10sIm5iZiI6MTcwMzE3MTk2MywiZXhwIjoyMDE4NTMxOTYzLCJpc3MiOiJkMGU0ZGFjNC02NWFlLTQ0MzctNmU1NC0wOGRiZTljMjlmZmYiLCJhdWQiOiJkMGU0ZGFjNC02NWFlLTQ0MzctNmU1NC0wOGRiZTljMjlmZmYifQ.MlHcyTKlMXG3HvbGPK5HLgW7IYeCPy9a4dTx-hwRLQPCcKnuOAmZVMlZUfMT7zGxWk0kWigE5LuNszPzUm2V2HWuHt_3Pe0cqpbHmbJ5mOkRxEP7T19pT3aIDMKs4Z8sHuMARhj5mrHcKyU2Z39L5BgmDZ1LVpuhyC71ZGkkZWnzdQ8NyQP1n8CLL55FNTQdBFxDWWbMmm_705q2CqhHLREQbuT-YHDJzlEmtaZyRhsCj9UAkvSmJEHSQjqfsP0cF4C0way2IHewq_zoO4bwhJQFrBqyJcTo4jCA1BLxh2-LM7g2yrNhBBJQxQADt5HeORVV0U1aSBOeWWThdP3sHA',
                    refreshToken: '',
                    expiresIn: 5256000,
                    dateStart: '2023-12-21T15:19:23.997',
                },
            };
            if (response.code === 200 && response.exception === 'correcto') {
                return true;
            }
            if (this._proxyConfig === 'error') throw new Error('Forzando un error dentro de discover()');
            return false; // No existe el recurso
        } catch (ex) {
            return false; // No existe el recurso
        }
    }
    hide() {
        try {
            const response = {
                code: this._proxyConfig ? 200 : 0,
                success: true,
                message: 'Proceso generado correctamente',
                detail: 'Proceso generado correctamente',
                exception: this._proxyConfig === 'error' ? 'fallo' : 'correcto',
                data: {
                    success: true,
                    messages: ['Nos hemos desconfigurado de forma correcta.'],
                },
            };
            if (response.code === 200 && response.exception === 'correcto') {
                return true;
            }
            if (this._proxyConfig === 'error') throw new Error('Forzando un error dentro de hide()');

            return false; // No existe el recurso
        } catch (ex) {
            return false; // No existe el recurso
        }
    }
}

export default MockDriver;
