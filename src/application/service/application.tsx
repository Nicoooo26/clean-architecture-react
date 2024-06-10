import LogType from '../entity/state';
import ErrorHandler from '../../error/ErrorHandler';
import { AppRouterInterface } from '../../router/service/router';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import AppRouter from '../../router/widget/router';
import { Root } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import themeJson from "../../assets/theme.json"
import { AppNavigatorInterface } from '../../router/service/navigator';
import { ThemeProvider } from "@mui/material";
import { createTheme} from "@mui/material/styles"
import theme from '../../assets/ProcontactCx.json'
//import theme from '../../../assets/ProcontactCx.json';

export interface UserInterface {
    get loggin(): LogType;
    get language(): string;
    render(root: Root): any;
}

export abstract class AbstractAplicattion implements UserInterface {
    public loggin: LogType = LogType.Unknown;
    public language: string = 'es-ES';

    public errorHandler: ErrorHandler;
    public router: AppRouterInterface;
    public navigator: AppNavigatorInterface;

    constructor(handler: ErrorHandler, router: AppRouterInterface, navigator: AppNavigatorInterface) {
        this.errorHandler = handler;
        this.router = router;
        this.navigator = navigator;
    }
    setLogState = (logState: LogType) => (this.loggin = logState);
    setLanguage = (language: string) => (this.language = language);

    render() {
        //https://zenoo.github.io/mui-theme-creator/
        const theme1 = createTheme(themeJson);
        const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <ThemeProvider theme={theme1}>
                        <AppRouter routes={this.router.elements} />
                    </ThemeProvider>
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}

class Application extends AbstractAplicattion {
    private static instance: AbstractAplicattion;
    private constructor(handler: ErrorHandler, router: AppRouterInterface, navigator: AppNavigatorInterface) {
        super(handler, router, navigator);

        return Application.instance;
    }

    public static create(handler: ErrorHandler, router: AppRouterInterface, navigator: AppNavigatorInterface): Application {
        this.instance = new Application(handler, router, navigator);
        return Application.instance;
    }

    public static getInstance(handler?: ErrorHandler, router?: AppRouterInterface, navigator?: AppNavigatorInterface): Application {
        if (!Application.instance) {
            throw Error(`Application not created`);
        }
        return Application.instance;
    }
}

export default Application;
