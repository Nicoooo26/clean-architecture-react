import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useCustomRouter } from "../pages/loginPage/useLoginRouter";
import { useCustomRouter2 } from "../pages/layoutPage/useLayoutRouter";

export const MyRoutes = () => {
  const CustomRouter = useCustomRouter();
  const CustomRouter2 = useCustomRouter2();

  return (
    <BrowserRouter>
      <Routes>
        {CustomRouter}
        {CustomRouter2}
      </Routes>
    </BrowserRouter>
  );
};
