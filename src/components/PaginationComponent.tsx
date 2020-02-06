import React, { Dispatch, Component } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import { Pagination } from "react-bootstrap";

interface Props {}

interface State {
  active: number;
  items: any[];
}

class PaginationComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  
    this.state = {
      active: 1,
      items: []
    };

    this.fillItems();
  }

  fillItems(){
    let i:number;
      for (i = 1; i <= 5; i++) {
      this.state.items.push(
           <Pagination.Item key={i} active={i === this.state.active}>
              {i}
          </Pagination.Item>
      );
  }
}

  componentDidMount() {
    // this.loadPage();
  }

  componentDidUpdate() {
    // this.loadPage();
  }

  //   loadPage() {
  //     // get page of items from api
  //     const params = new URLSearchParams(window.location.search);
  //     console.log(params);
  //     const page = 1;
  //     if (page !== this.state.pager.currentPage) {
  //       fetch(`/api/items?page=${page}`, { method: "GET" })
  //         .then(response => response.json())
  //         .then(({ pager, pageOfItems }) => {
  //           this.setState({ pager, pageOfItems });
  //         });
  //     }
  //   }

  render() {
    return (
      <div className="container">


  <div>
    <Pagination>{this.state.items}</Pagination>
    <br />

    <Pagination size="lg">{this.state.items}</Pagination>
    <br />

    <Pagination size="sm">{this.state.items}</Pagination>
  </div>
  </div>
      )

    }
  }
function mapStateToProps(state: AppState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
