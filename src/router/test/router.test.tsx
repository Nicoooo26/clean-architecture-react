/* eslint-disable testing-library/prefer-screen-queries */
import { NavigatorItem, NavigatorGroup } from '../entity/navigate';
import { RouteItem, RouteGroup } from '../entity/route';
import { NavigatorElement } from '../entity/navigate';
import ApplicationNavigator from '../service/navigator';
import ApplicationRouter from '../service/router';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigatorDrawer from '../widget/navigator';
import Icon from '@mui/material/Icon';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../widget/router';

// widget/navigator.test.tsx
describe('NavigatorDrawer', () => {
    it('should render navigator elements', () => {
        // Crea los elementos de navegación de forma más explícita
        const item1 = new NavigatorItem('Item 1', 'item1', {});
        const item2 = new NavigatorItem('Item 2', 'item2', {});
        const group = new NavigatorGroup('Group', 'group', [item1, item2], {});

        // Renderiza el componente dentro de MemoryRouter
        render(
            <MemoryRouter>
                <NavigatorDrawer elements={[group]} open={true} onClose={() => {}} />
            </MemoryRouter>
        );

        // Simula un clic en el ListItemButton para activar toggleListItem
        fireEvent.click(screen.getByText('Group'));

        // Verifica que openListItems se actualice correctamente
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        // Simula un clic en el ListItemButton de "Item 1"
        fireEvent.click(screen.getByText('Item 1'));
        // Verifica que se haya llamado correctamente a navigateTo con la ruta de "Item 1"
        expect(window.location.pathname).toEqual('/');
    });
});

describe('AppRouter', () => {
    it('should render routes correctly', () => {
        const routes = [new RouteItem('Test', 'test', <div />), new RouteGroup('Group', 'group', [new RouteItem('Subtest', 'subtest', <div />)])];
        render(
            <MemoryRouter>
                <AppRouter routes={routes} />
            </MemoryRouter>
        );
        expect(routes[0].title).toBe('Test');
        expect(routes[1].title).toBe('Group');
    });
});

describe('NavigatorItem', () => {
    it('should create a NavigatorItem', () => {
        const item = new NavigatorItem('Test', '/test', {});
        expect(item).toBeDefined();
        expect(item.title).toBe('Test');
        expect(item.path).toBe('/test');
    });

    it('should create a NavigatorItem from a RouteItem without options', () => {
        const routeItem = new RouteItem('Test', 'test', <div />);
        const navigatorItem = NavigatorItem.fromRouteItem(routeItem, {});
        expect(navigatorItem).toBeDefined();
        expect(navigatorItem.title).toBe('Test');
        expect(navigatorItem.path).toBe('/test');
        expect(navigatorItem.icon).toBeUndefined();
        expect(navigatorItem.builder).toBeDefined();
    });

    it('should create a NavigatorItem from a RouteItem with options', () => {
        const routeItem = new RouteItem('Test', 'test/:id', <div />);
        const options = { icon: <Icon />, params: { id: '123' } };
        const navigatorItem = NavigatorItem.fromRouteItem(routeItem, options);
        expect(navigatorItem).toBeDefined();
        expect(navigatorItem.title).toBe('Test');
        expect(navigatorItem.path).toBe('/test/123');
        expect(navigatorItem.icon).toBe(options.icon);
        // Add more assertions as needed for params
    });
});

describe('NavigatorGroup', () => {
    it('should create a NavigatorGroup', () => {
        const item = new NavigatorGroup('Group', '/group', [], {});
        expect(item).toBeDefined();
        expect(item.title).toBe('Group');
        expect(item.path).toBe('/group');
    });

    it('should create a NavigatorGroup from a RouteGroup', () => {
        const routeGroup = new RouteGroup('Group', '/group', []);
        const navigatorGroup = NavigatorGroup.fromRouteGroup(routeGroup, [], {});
        expect(navigatorGroup).toBeDefined();
        expect(navigatorGroup.title).toBe('Group');
        expect(navigatorGroup.path).toBe('/group');
        // Add more assertions as needed
    });

    it('should add a route to NavigatorGroup', () => {
        const navigatorGroup = new NavigatorGroup('Group', '/group', [], {});
        const navigatorItem = new NavigatorItem('Test', '/test', {});

        navigatorGroup.addRoute(navigatorItem);

        expect(navigatorGroup.routes.length).toBe(1);
        expect(navigatorGroup.routes[0]).toBe(navigatorItem);
    });
});

describe('RouteItem', () => {
    it('should create a RouteItem with builder from options', () => {
        const customBuilder = (page: React.ReactNode) => page;
        const item = new RouteItem('Test', '/test', <div />, { builder: customBuilder });

        expect(item).toBeDefined();
        expect(item.title).toBe('Test');
        expect(item.path).toBe('/test');
        expect(item.builder).toBe(customBuilder);
    });

    it('should create a RouteItem with default builder', () => {
        const item = new RouteItem('Test', '/test', <div />);

        expect(item).toBeDefined();
        expect(item.title).toBe('Test');
        expect(item.path).toBe('/test');
        expect(item.builder).toBeDefined(); // Ensure a builder function is assigned
    });
});

describe('RouteGroup', () => {
    it('should create a RouteGroup', () => {
        const item = new RouteGroup('Group', '/group', []);
        expect(item).toBeDefined();
        expect(item.title).toBe('Group');
        expect(item.path).toBe('/group');
    });
});

describe('RouteGroupAddRoute', () => {
    it('should add a route to RouteGroup', () => {
        const routeGroup = new RouteGroup('Group', '/group', []);
        const routeItem = new RouteItem('Test', '/test', <div />);

        routeGroup.addRoute(routeItem);

        expect(routeGroup.routes.length).toBe(1);
        expect(routeGroup.routes[0]).toBe(routeItem);
    });
});

// service/navigator.test.ts

describe('ApplicationNavigator', () => {
    it('should add a navigator element', () => {
        const navigator = new ApplicationNavigator();
        const element: NavigatorElement = { path: '/test', title: 'Test' };
        navigator.addNavigatorElement(element);
        expect(navigator.elements.length).toBe(1);
        expect(navigator.elements[0]).toEqual(element);
    });

    // Write more test cases for ApplicationNavigator as needed
});

// service/router.test.ts

describe('ApplicationRouter', () => {
    it('should add a route element', () => {
        const router = new ApplicationRouter();
        const element: RouteItem = new RouteItem('Test', '/test', <div />);
        router.addRoute(element);
        expect(router.elements.length).toBe(1);
        expect(router.elements[0]).toEqual(element);
    });

    it('should get a RouteGroup by path', () => {
        const routeGroup = new RouteGroup('Group', '/group', []);
        const router = new ApplicationRouter([routeGroup]);
        const foundGroup = router.getGroup('/group');
        expect(foundGroup).toEqual(routeGroup);
    });

    it('should return undefined if no RouteGroup found for the given path', () => {
        const router = new ApplicationRouter();
        const foundGroup = router.getGroup('/nonexistent');
        expect(foundGroup).toBeUndefined();
    });
});
