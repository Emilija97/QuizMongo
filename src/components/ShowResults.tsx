import React, { Component, Dispatch } from "react";
import { AppState } from "../store";
import { connect } from "react-redux";
import { fetchResults } from "../store/actions";
import { Action } from "redux";
import * as actions from "../store/actions";
// import "../styles/ToSelectQuestion.css";
import { Redirect } from "react-router";
import { Result } from "../models/Result";

interface Props {
  results: Result[];
  fetchResults: Function;
  deleteResult: Function;
}

interface State {
  redirect: boolean;
}

class ShowResults extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: false
    };

    this.refreshPage = this.refreshPage.bind(this);
    this.refreshPage();
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/HomePage" />;
    }
  };

  refreshPage() {
    if (window.localStorage) {
      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload();
      } else localStorage.removeItem("firstLoad");
    }
  }
  componentDidMount() {
    if (this.props.results.length === 0) this.props.fetchResults();
  }

  render() {
    if (!this.props.results) {
      return <h1>There isn't any result in database!</h1>;
    }
    return (
      <div id="select" className="d-flex flex-column align-content-center px-5 py-5">
        {this.renderRedirect()}
        <h3>See achieved results in the quiz:</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Date and Time of achieved result</th>
              <th scope="col">Achieved result</th>
              <th scope="col">Username</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map((result: Result, index: number) => (
              <tr key={result.id}>
                <th scope="row">{index}</th>
                <td>{result.date}</td>
                <td>{result.score}</td>
                <td>{result.username}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      this.props.deleteResult(result.id);
                    }}
                  >
                    Delete result
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex col-5 offset-4">
          <button
            className="backHome btn btn-info btn-md"
            onClick={() => {
              this.setRedirect();
            }}
          >
            Back to the home page
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    results: state.results
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchResults: () => dispatch(fetchResults()),
    deleteResult: (resultId: string) => dispatch(actions.deleteResult(resultId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowResults);
