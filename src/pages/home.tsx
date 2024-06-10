// Aplicación
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Application from '../application/service/application';

// Route item
import { RouteItem } from '../router/entity/route';
import { NavigatorItem } from '../router/entity/navigate';
import NavigatorDrawer from '../router/widget/navigator';
import Home from '../components/home';
import ApplicationAppBar from '../components/applicationBar';
import React from 'react';

export function home() {
    // Obtengo la instancia de la aplicación
    const app = Application.getInstance();

    // Preparo el builder
    // Condiciones para generar el componente
    const homeBuilder = (component: React.ReactNode) => component;

    // Registro la ruta
    const routeHome: RouteItem = new RouteItem('Home', 'home', <HomePage app={app} />, { builder: homeBuilder });
    app.router.addRoute(routeHome);

    // Creamos la navegación para esta página
    const navigatorHome: NavigatorItem = NavigatorItem.fromRouteItem(routeHome, { icon: <InboxIcon /> });

    // Añado la navegación a la aplicación
    app.navigator.addNavigatorElement(navigatorHome);
}
interface PropsHomePage {
    app: Application;
}

export const HomePage = (props: PropsHomePage) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleToggle = () => setOpenDrawer((prevOpenDrawer) => !prevOpenDrawer);
    return (
        <>
            <ApplicationAppBar onMenuClick={handleToggle} />
            <NavigatorDrawer open={openDrawer} elements={props.app.navigator.elements} onClose={handleToggle} />
            <Home />
        </>
    );
};
