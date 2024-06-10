// Aplicación
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Application from '../application/service/application';

// Route item
import { RouteItem } from '../router/entity/route';
import { NavigatorItem } from '../router/entity/navigate';
import NavigatorDrawer from '../router/widget/navigator';

import Prueba from '../components/prueba';
import ApplicationAppBar from '../components/applicationBar';
import React from 'react';
export function prueba() {
    // Obtengo la instancia de la aplicación
    const app = Application.getInstance();
    // Preparo el builder
    // Condiciones para generar el componente
    const homeBuilder = (component: React.ReactNode) => component;

    // Registro la ruta
    const routePrueba: RouteItem = new RouteItem('Prueba', 'prueba/:id/:hola', <PruebaPage app={app} />, { builder: homeBuilder });
    app.router.addRoute(routePrueba);

    // Creamos la navegación para esta página
    const navigatorPrueba: NavigatorItem = NavigatorItem.fromRouteItem(routePrueba, { icon: <InboxIcon />, params: { id: '300', hola: 'holaa' } });

    // Añado la navegación a la aplicación
    app.navigator.addNavigatorElement(navigatorPrueba);

}
interface PropsHomePage {
    app: Application;
}

const PruebaPage = (props: PropsHomePage) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const handleToggle = () => setOpenDrawer((openDrawer) => !openDrawer);

    return (
        <>
            <ApplicationAppBar onMenuClick={handleToggle} />
            <NavigatorDrawer open={openDrawer} elements={props.app.navigator.elements} onClose={handleToggle} />
            <Prueba />
        </>
    );
};
