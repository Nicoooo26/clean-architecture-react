import Prueba from './prueba';
import RouteItem from '../../RouteItemInterface';
import * as React from 'react';
import Application from '../../../application/service/application';


const Home = () => {
    const changeTitle = () =>{
    }
    return (
        <>
            Hola Home  <button onClick={changeTitle}>Cambiar Estado</button>
        </>
    );
};

const logged : boolean = true;
const p401 = () => {
    return '401';
};

export const routes: RouteItem[] = [
    { path: '/', builder: () => (logged ? Home() : p401()) },
    { path: '/prueba', builder: () => Prueba() },
];

export default Home;