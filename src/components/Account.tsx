import React, { Component, Dispatch } from "react";
import { User } from "../models/User";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions/users";
import { AuthState } from "../store/reducers/auth-reducer";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

interface Props {
  auth: AuthState;
  update: Function;
}

interface State {
  id: string;
  username: string;
  password: string;
  confPassword: string;
  name: string;
  surname: string;
  submitted: boolean;
}

class Account extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      confPassword: "",
      name: "",
      surname: "",
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("U handle sam");
    this.setState({ submitted: true });
    const { password, name, surname, confPassword } = this.state;
    console.log(e.target.elements.formBasicPassword.value);
    if (password === confPassword) {
      const user: User = {
        id: this.props.auth.user.id,
        username: this.props.auth.user.username,
        password: password !== "" ? password : this.props.auth.user.password,
        name: name !== "" ? name : this.props.auth.user.name,
        surname: surname !== "" ? surname : this.props.auth.user.surname
      };
      this.props.update(user);
    }
  }
  // (e: any) =>

  render() {
    return (
      <div className="flex col-md-4 offset-md-4 py-5">
        <h3>Account settings </h3>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address </Form.Label>
            <Form.Control
              type="email"
              readOnly
              placeholder={this.props.auth.user.username}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e: any) => this.setState({ password: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e: any) => this.setState({ confPassword: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Name - {this.props.auth.user.name}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e: any) => this.setState({ name: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSurname">
            <Form.Label>Surname - {this.props.auth.user.surname}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Surname"
              onChange={(e: any) => this.setState({ surname: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
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
    update: (user: User) => dispatch(actions.update(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
