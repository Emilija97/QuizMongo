import React, { Component, Dispatch } from "react";
import { Action } from "redux";
import { AppState } from "../store";
import { connect } from "react-redux";
import { CardItem } from "../models/CardItem";
import * as actions from "../store/actions/cards";
import { Card, CardColumns, Button, Navbar, Form, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

interface Props {
  cards: CardItem[];
  fetchCards: Function;
  searchForCard: Function;
  editCard: Function;
}

interface State {
  currentPage: number;
  total: number;
  flag: boolean;
  searchTitle: string;
  redirect: boolean;
}
class ShowCards extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: this.props.cards.length,
      flag: false,
      searchTitle: "",
      redirect: false
    };
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/EditCard" />;
    }
  };

  componentDidMount() {
    if (this.props.cards.length === 0) this.props.fetchCards();
  }

  render() {
    if (this.props.cards.length === 0) {
      return <h1>There isn't any card to show!</h1>;
    }
    return (
      <div className="d-flex flex-column text-center align-content-lg-start">
        {this.renderRedirect()}
        <Navbar>
          <Navbar.Collapse className="justify-content-end">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search by word"
                className="mr-sm-2"
                onChange={(e: any) => this.setState({ searchTitle: e.target.value })}
              />
              <Button
                variant="outline-info"
                onClick={() => {
                  this.state.searchTitle === ""
                    ? this.props.fetchCards()
                    : this.props.searchForCard(this.state.searchTitle);
                }}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <CardColumns>
          {this.props.cards.map((card: CardItem, index: number) => (
            <Card bg="info" text="white" style={{ width: "24rem" }} key={card.id}>
              <Card.Header as="h5">
                {card.title}{" "}
                <Button
                  className="float-right py-1 btn-info"
                  onClick={() => {
                    this.props.editCard(card);
                    this.setRedirect();
                  }}
                >
                  <FaEdit />
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
        </CardColumns>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    cards: state.cards
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchCards: () => dispatch(actions.fetchCards()),
    editCard: (card: CardItem) => dispatch(actions.editCard(card)),
    searchForCard: (title: string) => dispatch(actions.searchForCard(title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards);
