import React, { Component, Dispatch } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions/users";
import { AuthState } from "../store/reducers/auth-reducer";
import { Link, Redirect } from "react-router-dom";

interface Props {
  logIn: Function;
  auth: AuthState;
  isAuthenticated: boolean;
  logOut: Function;
}

interface State {
  username: string;
  password: string;
  submitted: boolean;
  name: string;
}

class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      name: "",
      submitted: false
    };

    this.props.logOut();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps() {
    console.log(this.props.auth);
  }

  componentWillMount() {
    console.log(this.props.auth);
  }

  handleSubmit(e: any) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.logIn(username, password);
    }

    console.log(this.props.auth.isAuthenticated);
  }

  render() {
    if (this.props.auth.isAuthenticated === true) {
      return <Redirect to="/HomePage" />;
    } else
      return (
        <div className="flex col-md-4 offset-md-4 py-5">
          <h3>Login Page</h3>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                "form-group" +
                (this.state.submitted && !this.state.username ? " has-error" : "")
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
              <button className="btn btn-primary">Log In</button>
              <Link to="/Register" className="btn btn-link">
                Register
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
    logIn: (username: string, password: string) =>
      dispatch(actions.logIn(username, password)),
    logOut: () => dispatch(actions.logOut())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
