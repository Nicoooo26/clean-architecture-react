export interface RouteElementInterface {
    path: string;
    title: string;
}

export abstract class RouteElement {
    path: string;
    title: string;

    constructor(title: string, path: string) {
        this.path = path;
        this.title = title;
    }
}

export class RouteItem extends RouteElement {
    page: React.ReactNode;
    //icon?: React.ReactNode;
    builder: (page: React.ReactNode) => React.ReactNode;

    constructor(
        title: string,
        path: string,
        page: React.ReactNode,
        options?: {
            //icon?: React.ReactNode;
            builder?: (page: React.ReactNode) => React.ReactNode;
        }
    ) {
        super(title, path);
        //this.icon = options.icon;
        this.page = page;
        this.builder = options?.builder ? options.builder : (page: React.ReactNode) => page;
        // if(options.builder){
        //     this.builder = options.builder;
        // }
        // else{
        //     this.builder = (page : React.ReactNode) => page;
        // }
    }
    // static fromNavigatorItem(navigatorItem: NavigatorItem): RouteItem {
    //     return new RouteItem(navigatorItem.title,navigatorItem.path,navigatorItem.page,{builder:navigatorItem.builder});
    // }
}

//Route Group
export class RouteGroup extends RouteElement {
    routes: RouteItem[];

    constructor(title: string, path: string, routes: RouteItem[]) {
        super(title, path);
        this.routes = routes;
    }

    addRoute = (route: RouteItem) => {
        this.routes.push(route);
    };
}
