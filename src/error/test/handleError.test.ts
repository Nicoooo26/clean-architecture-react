/* eslint-disable no-throw-literal */
import ErrorHandler from "../ErrorHandler";

test("constructor sets handler value correctly", () => {
    // Preparamos el manejador personalizado
    let resultado: string = "";
    let fn = (ex: any): boolean => {
        resultado = `${ex}`;
        return true;
    };

    // Iniciamos el controlador de errores
    let errorHandler: ErrorHandler = new ErrorHandler(fn);

    // Lanzamos una excepción
    try {
        throw "error";
    } catch (ex: any) {
        errorHandler.onError(ex);
    }
    // Verificamos el resultado
    expect(resultado).toBe("error");
});
