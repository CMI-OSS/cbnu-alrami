import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import getGlobalStyle from "./globalStyle";

function App() {
  return (
    <>
      <Global styles={getGlobalStyle()} />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
