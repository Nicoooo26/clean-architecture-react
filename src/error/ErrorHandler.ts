class ErrorHandler {
    private _handler = (ex: any): boolean => false;

    constructor(handler?: (ex: any) => boolean) {
        if (handler) {
            this._handler = handler;
        }
    }

    onError = (ex: any): void => {
        if (this._handler(ex)) {
            console.error(ex);
        }
    };
}

export default ErrorHandler;
