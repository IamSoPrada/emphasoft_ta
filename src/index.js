import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import ErrorBoundry from "./error-boundry";

import store from "./store";
import UsersService from "./services/usersService";
import { UsersServiceProvider } from "./users-service-context";

const usersService = new UsersService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <UsersServiceProvider value={usersService}>
        <Router>
          <App />
        </Router>
      </UsersServiceProvider>
    </ErrorBoundry>
  </Provider>,

  document.getElementById("root")
);
