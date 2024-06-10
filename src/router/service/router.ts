//Dominio
import { RouteElement, RouteGroup } from '../entity/route';
//Firma de application
export interface AppRouterInterface {
    get elements(): RouteElement[];
    addRoute(RouteElement: RouteElement): void;
    getGroup(path: string): RouteGroup;
}

//Logica Abstracta
export abstract class AbstractApplicationRouter implements AppRouterInterface {
    elements: RouteElement[];

    constructor(routes: RouteElement[] = []) {
        this.elements = routes;
    }
    addRoute = (route: RouteElement) => {
        this.elements.push(route);
    };

    getGroup = (path: string): RouteGroup => this.elements.find((x) => x instanceof RouteGroup && x.path === path) as RouteGroup;
    // getGroup = <T>(path:string):T=>this.elements.find(x=>x instanceof T && x.path===path) as T;
}

class ApplicationRouter extends AbstractApplicationRouter {}

export default ApplicationRouter;
