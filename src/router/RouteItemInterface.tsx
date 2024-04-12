import { ReactNode } from 'react';
import Application from '../application/service/application';

export default interface RouteItem {
    path: string;
    builder:() => ReactNode;
}
