import React, { Dispatch, Component } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";

interface Props {
  refresh: boolean;
  postsPerPage: number;
  totalPosts: number;
  paginatePage: Function;
}

interface State {
  active: number;
  items: any[];
  pageNumbers: number[];
  total: number;
}

class PaginationComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: 1,
      items: [],
      pageNumbers: [],
      total: this.props.totalPosts
    };
    this.fillItems();
  }

  fillItems() {
    for (let i = 1; i <= Math.ceil(this.state.total / this.props.postsPerPage); i++) {
      this.state.pageNumbers.push(i);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.totalPosts !== prevProps.totalPosts) {
      this.setState({ total: this.props.totalPosts });
    }
    this.fillItems();
  }

  componentWillReceiveProps(nextProps: Props) {
    const { refresh, postsPerPage, totalPosts } = this.props;
    if (
      nextProps.refresh !== refresh ||
      nextProps.postsPerPage !== postsPerPage ||
      nextProps.totalPosts !== totalPosts
    ) {
      this.setState({
        total: nextProps.totalPosts,
        pageNumbers: []
      });
      this.fillItems();
    }
  }

  render() {
    if (this.state.total === 0) {
      return null;
    }
    return (
      <div>
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
      </div>
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
