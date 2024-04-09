import { Route } from "react-router-dom";
import Layout from ".";
import Home from "../homePage";

export const useCustomRouter2 = () => {
  return (
    <>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </>
  );
};
