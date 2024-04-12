import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '..';
import { routes } from './pruebaRutas/home';
import Application from '../../application/service/application';
test('renders all routes', async () => {
    //carga todas las rutas que le pasemos
    render(
        <MemoryRouter>
            <AppRouter routes={routes} />
        </MemoryRouter>
    );

    expect(screen.getByText(/Hola Home/i)).toBeInTheDocument();
});

test('render another page', () => {
    const route = '/prueba';
    //Cargamos nuestras rutas y le decimos que entre a la ruta /prueba
    render(
        <MemoryRouter initialEntries={[route]}>
            <AppRouter routes={routes}/>
        </MemoryRouter>
    );

    expect(screen.getByText(/holaa soy prueba/i)).toBeInTheDocument();
});
