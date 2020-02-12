import React, { Component, Dispatch } from "react";
import { Action } from "redux";
import { AppState } from "../store";
import { connect } from "react-redux";
import { CardItem } from "../models/CardItem";
import * as actions from "../store/actions/cards";
import { paginate } from "../store/actions/questions";
import PaginationComponent from "./PaginationComponent";
import {
  Card,
  CardDeck,
  CardGroup,
  CardColumns,
  Button,
  Navbar,
  Form,
  FormControl
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

interface Props {
  cardList: CardItem[];
  cards: CardItem[];
  paginate: Function;
  fetchCards: Function;
  searchForCard: Function;
}

interface State {
  currentPage: number;
  total: number;
  flag: boolean;
  searchTitle: string;
}
class ShowCards extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      total: this.props.cards.length,
      flag: false,
      searchTitle: ""
    };
  }
  //   setRedirect = () => {
  //     this.setState({
  //       redirect: true
  //     });
  //   };
  //   renderRedirect = () => {
  //     if (this.state.redirect) {
  //       return <Redirect to="/SelectedQuestion" />;
  //     }
  //   };
  paginatePage = (pageNumber: number) => this.setCurrentPage(pageNumber);
  setCurrentPage = (pageNumber: number) => {
    this.setState({
      currentPage: pageNumber
    });
    this.props.paginate("cards", pageNumber);
  };

  componentDidMount() {
    if (this.props.cardList.length === 0)
      this.props.paginate("cards", this.state.currentPage);
    if (this.props.cards.length === 0) this.props.fetchCards();
    this.refreshPagination();
  }

  refreshPagination = () => {
    this.setState({ flag: !this.state.flag });
  };

  handleClick = () => {
    console.log("CLick sam");
  };
  searchByCard = (payload: string) => {
    console.log(payload);
  };

  render() {
    if (!this.props.cardList && this.props.cards.length !== 0) {
      return <h1>There isn't any card to show!</h1>;
    }
    return (
      <div className="d-flex flex-column text-center align-content-lg-start">
        <Navbar>
          <Navbar.Collapse className="justify-content-end">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search by title"
                className="mr-sm-2"
                onChange={(e: any) => this.setState({ searchTitle: e.target.value })}
              />
              <Button
                variant="outline-info"
                onClick={() => this.props.searchForCard(this.state.searchTitle)}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <CardColumns>
          {this.props.cardList.map((card: CardItem, index: number) => (
            <Card bg="info" text="white" style={{ width: "24rem" }} key={card.id}>
              <Card.Header as="h5">
                {card.title}{" "}
                <Button
                  className="float-right py-1 btn-info"
                  onClick={() => this.handleClick()}
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
          <PaginationComponent
            refresh={this.state.flag}
            postsPerPage={10}
            totalPosts={this.props.cards.length}
            paginatePage={this.paginatePage}
          />
          {/* </div>
      </div> */}
        </CardColumns>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    cardList: state.cardList,
    cards: state.cards
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchCards: () => dispatch(actions.fetchCards()),
    paginate: (collection: string, page: number) => dispatch(paginate(collection, page)),
    searchForCard: (title: string) => dispatch(actions.searchForCard(title))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards);
