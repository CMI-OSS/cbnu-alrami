import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import Home from "@admin/pages/Home";
import { Provider } from "react-redux";
import getGlobalStyle from "@shared/styles/globalStyle";
import Login from "./pages/Login";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Global styles={getGlobalStyle()} />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
