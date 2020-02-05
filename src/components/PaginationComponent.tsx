import React, { Dispatch, Component } from "react";
import { Link } from "react-router-dom";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";

interface Props {}

interface State {
  pager: any;
  pageOfItems: number[];
}

class PaginationComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pager: {},
      pageOfItems: []
    };
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
    const { pager, pageOfItems } = this.state;
    return (
      <div className="container">
        <div className="card-footer pb-0 pt-3">
          {pager.pages && pager.pages.length && (
            <ul className="pagination">
              <li
                className={`page-item first-item ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                <Link to={{ search: `?page=1` }} className="page-link">
                  First
                </Link>
              </li>
              <li
                className={`page-item previous-item ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                <Link
                  to={{ search: `?page=${pager.currentPage - 1}` }}
                  className="page-link"
                >
                  Previous
                </Link>
              </li>
              {pager.pages.map((page: number) => (
                <li
                  key={page}
                  className={`page-item number-item ${
                    pager.currentPage === page ? "active" : ""
                  }`}
                >
                  <Link to={{ search: `?page=${page}` }} className="page-link">
                    {page}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item next-item ${
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }`}
              >
                <Link
                  to={{ search: `?page=${pager.currentPage + 1}` }}
                  className="page-link"
                >
                  Next
                </Link>
              </li>
              <li
                className={`page-item last-item ${
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }`}
              >
                <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">
                  Last
                </Link>
              </li>
            </ul>
          )}
        </div>
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
