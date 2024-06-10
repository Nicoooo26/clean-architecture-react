//import './index.css';
import ApplicationRouter from './router/service/router';
import ErrorHandler from './error/ErrorHandler';
import Application from './application/service/application';
import ApplicationNavigator from './router/service/navigator';
import { home } from './pages/home';
import { prueba } from './pages/prueba';

//console.log(path.join('a'));

// Preparamos el manejador de errores de la aplicación
const handler = new ErrorHandler();
// Preparamos el enrutador
const router = new ApplicationRouter();
// Preparamos el navegador
const navigator = new ApplicationNavigator();

const app = Application.create(handler, router, navigator);



home();

prueba();

app.render();
