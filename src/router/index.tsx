import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../pages/layoutPage";
import Login from "../pages/loginPage";
import Welcome from "../pages/welcomePage";
import LinkContesta from "../pages/linkContesta";
import Home from "../pages/homePage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="contesta" element={<LinkContesta/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
