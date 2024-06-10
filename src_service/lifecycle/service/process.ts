import ApplicationLifeCycle from './lifecycle';

export interface ProcessInterface {
    attach(): void;
}

export abstract class AbstractProcess implements ProcessInterface {
    // config: any;
    lifecycle: ApplicationLifeCycle;
    constructor(lifecycle: ApplicationLifeCycle) {
        // this.config = config;
        this.lifecycle = lifecycle;
    }
    attach(): void {
        process.stdin.resume(); //so the program will not close instantly

        // Makes the script crash on unhandled rejections instead of silently
        // ignoring them. In the future, promise rejections that are not handled will
        // terminate the Node.js process with a non-zero exit code.
        process.on('unhandledRejection', this.lifecycle.onStopping.bind(null, { cleanup: true, name: 'unhandledRejection' }));

        //do something when app is closing
        process.on('exit', this.lifecycle.onStopping.bind(null, { cleanup: true, name: 'exit' }));

        //catches ctrl+c event
        process.on('SIGINT', this.lifecycle.onStopping.bind(null, { exit: true, name: 'SIGINT' }));

        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', this.lifecycle.onStopping.bind(null, { exit: true, name: 'SIGUSR1' }));
        process.on('SIGUSR2', this.lifecycle.onStopping.bind(null, { exit: true, name: 'SIGUSR2' }));

        //catches uncaught exceptions
        process.on('uncaughtException', this.lifecycle.onStopping.bind(null, { exit: true, name: 'uncaughtException' }));
    }
}

class ApplicationProcess extends AbstractProcess {}

export default ApplicationProcess;
