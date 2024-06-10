import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteElement, RouteGroup, RouteItem } from "../entity/route"; // Asumiendo que has definido estos tipos

const AppRouter: React.FC<{ routes: RouteElement[] }> = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) =>
        route instanceof RouteGroup ? (
          <Route key={index} path={route.path}>
            {route.routes.map((subRoute, subIndex) => (
              <Route key={subIndex} path={subRoute.path} element={subRoute.builder(subRoute.page)} />
            ))}
          </Route>
        ) : route instanceof RouteItem ? (
          <Route key={index} path={route.path} element={route.builder(route.page)} />
        ) : null
      )}
    </Routes>
  );
};

export default AppRouter;
