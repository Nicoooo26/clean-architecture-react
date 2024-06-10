import { RouteGroup, RouteItem } from './route';

export interface NavigatorElementInterface {
    path: string;
    title: string;
}

export abstract class NavigatorElement {
    path: string;
    title: string;

    constructor(title: string, path: string) {
        this.path = path;
        this.title = title;
    }
}

export class NavigatorItem extends NavigatorElement {
    icon?: React.ReactNode;
    builder: (component: React.ReactNode) => React.ReactNode;

    constructor(title: string, path: string, options: { icon?: React.ReactNode; builder?: (component: React.ReactNode) => React.ReactNode }) {
        super(title, path);
        this.icon = options.icon;
        this.builder = options.builder ? options.builder : (component: React.ReactNode) => component;
        // if(options.builder){
        //     this.builder = options.builder;
        // }
        // else{
        //     this.builder = (page : React.ReactNode) => page;
        // }
    }

    static fromRouteItem(routeItem: RouteItem, options: { icon?: React.ReactNode; params?: { [key: string]: string } }): NavigatorItem {
        //const params: { [key: string]: string } = { id: '300', prueba: '500' };
        const rute = options.params
            ? routeItem.path
                  .split('/')
                  .map((el) => (/^:/.test(el) ? `${options.params![el.substring(1)]}` : el))
                  .join('/')
            : routeItem.path;

        // if (options.params) {
        //     rute.split('/')
        //         .map((el) => (/^:/.test(el) ? `${options.params![el.substring(1)]}` : el))
        //         .join('/');
        //     console.log(rute);
        // }
        return new NavigatorItem(routeItem.title, '/' + rute, { icon: options.icon, builder: routeItem.builder });
    }
}

//Route Group
export class NavigatorGroup extends NavigatorElement {
    routes: NavigatorItem[];
    icon?: React.ReactNode;
    constructor(title: string, path: string, routes: NavigatorItem[], options: { icon?: React.ReactNode }) {
        super(title, path);
        this.routes = routes;
        this.icon = options.icon;
    }

    addRoute = (route: NavigatorItem) => {
        this.routes.push(route);
    };

    static fromRouteGroup(routeGroup: RouteGroup, navigatorGroup: NavigatorItem[], options: { icon?: React.ReactNode }): NavigatorGroup {
        navigatorGroup.map((el) => (el.path = '/' + routeGroup.path + el.path));

        return new NavigatorGroup(routeGroup.title, routeGroup.path, navigatorGroup, { icon: options.icon });
    }
}
