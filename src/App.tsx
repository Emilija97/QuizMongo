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
import { meFromToken, logOut } from "./store/actions/users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Home.css";
import { Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";

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
          <Navbar bg="dark" expand="lg" variant="dark">
            {!localStorage.getItem("token") ? (
              <Navbar.Brand href="/">Home</Navbar.Brand>
            ) : (
              <Navbar.Brand href="/HomePage">Quiz-Page</Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/Account">Account</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {!localStorage.getItem("token") ? (
                <Nav className="ml-auto">
                  <Nav.Link href="/">Log In</Nav.Link>
                  <Nav.Link href="/Register">Register</Nav.Link>
                </Nav>
              ) : (
                <Form inline>
                  <a href="/">
                    <Button
                      variant="outline-info"
                      onClick={() => questionStore.dispatch(logOut())}
                    >
                      Log Out
                    </Button>
                  </a>
                </Form>
              )}
            </Navbar.Collapse>
          </Navbar>
          <Routes />
        </Router>
      </Provider>
    );
  }
}

export default App;
