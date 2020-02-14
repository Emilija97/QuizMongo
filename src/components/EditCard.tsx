import React, { Component, Dispatch } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import { AuthState } from "../store/reducers/auth-reducer";
import { Form, Button } from "react-bootstrap";
import { CardItem } from "../models/CardItem";
import { Redirect } from "react-router-dom";
import { updateCard } from "../store/actions/cards";

interface Props {
  auth: AuthState;
  updateCard: Function;
  edited: CardItem;
}

interface State {
  username: string;
  title: string;
  field: string;
  submitted: boolean;
  redirect: boolean;
}

class EditCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      title: "",
      field: "",
      submitted: false,
      redirect: false
    };

    console.log(this.props.edited.title);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/ShowCards" />;
    }
  };

  handleSubmit(e: any) {
    e.preventDefault();
    console.log("U handle sam");
    this.setState({ submitted: true });
    const { title, field } = this.state;
    const card: CardItem = {
      id: this.props.edited.id,
      date: this.props.edited.date,
      username: this.props.auth.user.username,
      title: title !== "" ? title : this.props.edited.title,
      field: field !== "" ? field : this.props.edited.field
    };
    this.props.updateCard(card);
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return <h3>You have to be logged in</h3>;
    }
    return (
      <div className="flex col-md-4 offset-md-4 py-5">
        {this.renderRedirect()}
        <h3>Edit card</h3>

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

          <Form.Group controlId="formBasicDate">
            <Form.Label>Created </Form.Label>
            <Form.Control type="text" readOnly placeholder={this.props.edited.date} />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={this.props.edited.title}
              onChange={(e: any) => this.setState({ title: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Card Field</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              defaultValue={this.props.edited.field}
              onChange={(e: any) => this.setState({ field: e.target.value })}
            />
          </Form.Group>

          <h5 className="text-danger">{this.props.auth.errorMessage}</h5>

          <Button className="float-right" variant="primary" type="submit">
            Submit
          </Button>

          <Button variant="primary" type="submit" onClick={() => this.setRedirect()}>
            Back
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.auth,
    edited: state.edited
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    updateCard: (card: CardItem) => dispatch(updateCard(card))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);
