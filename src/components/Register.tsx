import React, { Component, Dispatch } from "react";
import { User } from "../models/User";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions/users";
import { AuthState } from "../store/reducers/auth-reducer";
import { Link, Redirect } from "react-router-dom";

interface Props {
  register: Function;
  auth: AuthState;
}

interface State {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  submitted: boolean;
}

class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      name: "",
      surname: "",
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, name, surname } = this.state;
    if (username && password && name && surname) {
      const user: User = {
        id: (Math.random() * 100).toString(),
        username: username,
        password: password,
        name: name,
        surname: surname
      };
      this.props.register(user);
    }

    console.log(this.props.auth.isAuthenticated);
  }

  render() {
    if (this.props.auth.registered === true) {
      return <Redirect to="/LoginPage" />;
    } else
      return (
        <div className="flex col-md-4 offset-md-4 py-5">
          <h3>Register page </h3>
          <h3 className="text-danger">{this.props.auth.errorMessage}</h3>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                "form-group" +
                (this.state.submitted && !this.state.name ? " has-error" : "")
              }
            >
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              {this.state.submitted && !this.state.name && (
                <div className="help-block">Name is required</div>
              )}
            </div>
            <div
              className={
                "form-group" +
                (this.state.submitted && !this.state.surname ? " has-error" : "")
              }
            >
              <label htmlFor="lastName">Surname</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={this.state.surname}
                onChange={e => this.setState({ surname: e.target.value })}
              />
              {this.state.submitted && !this.state.surname && (
                <div className="help-block">Surname is required</div>
              )}
            </div>
            <div
              className={
                "form-group" +
                (this.state.submitted && !this.state.surname ? " has-error" : "")
              }
            >
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              {this.state.submitted && !this.state.username && (
                <div className="help-block">Username is required</div>
              )}
            </div>
            <div
              className={
                "form-group" +
                (this.state.submitted && !this.state.password ? " has-error" : "")
              }
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              {this.state.submitted && !this.state.password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Register</button>
              <Link to="/LoginPage" className="btn btn-link">
                Log in
              </Link>
            </div>
          </form>
        </div>
      );
  }
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    register: (user: User) => dispatch(actions.register(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
