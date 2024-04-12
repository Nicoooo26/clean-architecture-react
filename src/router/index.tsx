/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RouteItem from './RouteItemInterface';
import Application from '../application/service/application';

const AppRouter: React.FC<{ routes: RouteItem[] }> = ({ routes }) => {
    return (
        <Routes>
            <>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.builder()} />
                ))}
            </>
        </Routes>
    );
};
export default AppRouter;
