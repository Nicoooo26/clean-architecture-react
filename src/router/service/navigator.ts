//Dominio
import { NavigatorElement, NavigatorGroup } from '../entity/navigate';
//Firma de application
export interface AppNavigatorInterface {
    get elements(): NavigatorElement[];
    addNavigatorElement(NavigatorElement: NavigatorElement): void;
    //getGroup(path:string):NavigatorGroup
}

//Logica Abstracta
export abstract class AbstractApplicationNavigator implements AppNavigatorInterface {
    elements: NavigatorElement[];

    constructor(navigators: NavigatorElement[] = []) {
        this.elements = navigators;
    }
    addNavigatorElement = (navigator: NavigatorElement) => {
        this.elements.push(navigator);
    };

    //getGroup = (path:string) :NavigatorGroup => this.elements.find(x=>x instanceof NavigatorGroup && x.path === path) as NavigatorGroup;
    // getGroup = <T>(path:string):T=>this.elements.find(x=>x instanceof T && x.path===path) as T;
}

class ApplicationNavigator extends AbstractApplicationNavigator {}

export default ApplicationNavigator;
