import React, { Component, Dispatch } from "react";
import { Action } from "redux";
import { AppState } from "../store";
import { connect } from "react-redux";
import { CardItem } from "../models/CardItem";
import * as actions from "../store/actions/cards";
import { Card, CardColumns, Button } from "react-bootstrap";
import { FiDelete } from "react-icons/fi";
import { AuthState } from "../store/reducers/auth-reducer";

interface Props {
  cards: CardItem[];
  auth: AuthState;
  fetchCardsByUsername: Function;
  deleteCard: Function;
}

interface State {
  username: string;
}
class DeleteCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { auth } = this.props;
    console.log(auth);
    if (nextProps.auth !== auth) {
      this.props.fetchCardsByUsername(nextProps.auth.user.username);
    }
  }

  render() {
    if (this.props.cards.length === 0 && !this.props.auth.isAuthenticated) {
      return <h1>There isn't any card to show!</h1>;
    }
    return (
      <div className="d-flex flex-column text-center align-content-lg-start">
        <CardColumns className="py-5">
          {this.props.cards.map((card: CardItem, index: number) => (
            <Card bg="info" text="white" style={{ width: "24rem" }} key={card.id}>
              <Card.Header as="h5">
                {card.title}{" "}
                <Button
                  className="float-right py-1 btn-info"
                  onClick={() => {
                    this.props.deleteCard(card.id);
                  }}
                >
                  <FiDelete />
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title>Info About Card</Card.Title>
                <Card.Text>{card.field}</Card.Text>
                <footer className="blockquote-footer text-light">
                  Author:{" "}
                  <cite className="text-dark" title={card.username}>
                    {card.username}
                  </cite>
                  , written:{" "}
                  <cite className="text-dark" title={card.date}>
                    {card.date}
                  </cite>
                </footer>
              </Card.Body>
            </Card>
          ))}
          {/* </div>
      </div> */}
        </CardColumns>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    cards: state.cards,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchCardsByUsername: (username: string) =>
      dispatch(actions.fetchCardsByUsername(username)),
    deleteCard: (cardId: string) => dispatch(actions.deleteCard(cardId)),
    searchForCard: (title: string) => dispatch(actions.searchForCard(title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCard);
