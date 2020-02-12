import React, { Component, Dispatch } from "react";
import { User } from "../models/User";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import * as actions from "../store/actions/cards";
import { AuthState } from "../store/reducers/auth-reducer";
import { Form, Button } from "react-bootstrap";
import { CardItem } from "../models/CardItem";
import uuid from "uuid";

interface Props {
  auth: AuthState;
  saveCard: Function;
}

interface State {
  title: string;
  field: string;
  date: string;
  username: string;
}

class CardPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      field: "",
      date: "",
      username: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getDate = () => {
    const time = new Date().toString();
    this.setState({ date: time });
  };

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("U handle sam");
    const { title, field } = this.state;
    const card: CardItem = {
      id: uuid.v4().toString(),
      title: title,
      field: field,
      date: this.state.date,
      username: this.props.auth.user.username
    };
    this.props.saveCard(card);
  }

  componentDidMount() {
    this.getDate();
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <h3>You have to be logged in</h3>;
    }
    return (
      <div className="flex col-md-4 offset-md-4 py-5">
        <h3>Create Card </h3>

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

          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title </Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(e: any) => this.setState({ title: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Card Field</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={(e: any) => this.setState({ field: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Card
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
    saveCard: (card: CardItem) => dispatch(actions.saveCard(card))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
