import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import ScraperPage from "src/pages/ScraperPage";
import { Provider } from "react-redux";
import getGlobalStyle from "@shared/styles/globalStyle";
import getAdminStyle from "src/adminStyle";
import LoginPage from "./pages/Login";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Global styles={getGlobalStyle()} />
      <Global styles={getAdminStyle()} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path={[ "/", "/scraper" ]} component={ScraperPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
