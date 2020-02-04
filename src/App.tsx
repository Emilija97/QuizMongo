import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { Routes } from "./routers/routes";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./store/sagas";
import { checkUser, meFromToken } from "./store/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";

export const env = {
  url: "http://localhost:3000"
};

const sagaMiddleware = createSagaMiddleware();
const questionStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export function loadUserFromToken() {
  let token = localStorage.getItem("token");
  console.log("Token u app " + token);
  if (!token || token === "") {
    //if there is no token, dont bother
    return;
  }
  questionStore.dispatch(meFromToken(token));
}

loadUserFromToken();

const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Provider store={questionStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
