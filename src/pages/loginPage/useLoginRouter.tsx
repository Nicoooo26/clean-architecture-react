import { Route } from "react-router-dom";
import Login from ".";

export const useCustomRouter = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
    </>
  );
};
