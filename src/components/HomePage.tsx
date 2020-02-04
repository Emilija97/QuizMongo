import React, { Component, Dispatch } from "react";
import { Link, Redirect } from "react-router-dom";
import { Question } from "../models/Question";
import { AppState } from "../store";
import { Action } from "redux";
import { fetchQuestions, fetchResults, logOut } from "../store/actions";
import { connect } from "react-redux";
// import "../styles/HomePage.css";
import { Result } from "../models/Result";
// import { UserState } from "../store/auth-reducer";

interface Props {
  questions: Question[];
  fetchQuestions: Function;
  results: Result[];
  fetchResults: Function;
  // auth: UserState;
}
interface State {}
class AppRoot extends Component<Props, State> {
  componentDidMount() {
    // console.log(this.props.auth);
    if (this.props.questions.length === 1) this.props.fetchQuestions();
    if (this.props.results.length === 0) this.props.fetchResults();
  }

  render() {
    return (
      <div
        id="pocetna"
        className="d-flex flex-column text-center align-content-lg-start py-5"
      >
        <h2>Welcome to the QUIZ</h2>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/QuestionList">Go to quiz</Link>
          </button>
        </div>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/ToSelectQuestion">Go to get information about questions</Link>
          </button>
        </div>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/AddDeleteQuestion">Go to add new question or delete some</Link>
          </button>
        </div>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/ChosenNumber">Play quiz with specific number of question</Link>
          </button>
        </div>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/ShowResults">See list of achieved results</Link>
          </button>
        </div>
        <div>
          <button id="navigacija" className="btn btn-link">
            <Link to="/">Log out</Link>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    questions: state.questions,
    results: state.results
    // auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchResults: () => dispatch(fetchResults())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
