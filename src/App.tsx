import React from "react";
import AppRouter from "./router";
import { routes } from "./router/test/pruebaRutas/home";
import Application from "./application/service/application";

function App() {

  return (
  <div className="App">
    <AppRouter routes={routes}/>
  </div>
  )
}

export default App;
