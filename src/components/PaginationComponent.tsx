import React, { Dispatch, Component } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";

interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginatePage: Function;
}

interface State {
  active: number;
  items: any[];
  pageNumbers: number[];
}

class PaginationComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(this.props.totalPosts);
    this.state = {
      active: 1,
      items: [],
      pageNumbers: []
    };

    this.fillItems();
  }

  fillItems() {
    console.log("U fill items sam");
    console.log("total " + this.props.totalPosts);
    for (
      let i = 1;
      i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage);
      i++
    ) {
      this.state.pageNumbers.push(i);
    }
  }

  render() {
    return (
      <nav>
        <ul className="pagination justify-content-center">
          {this.state.pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button
                onClick={() => this.props.paginatePage(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
function mapStateToProps(state: AppState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
