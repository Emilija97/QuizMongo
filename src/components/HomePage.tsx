import React, { Component, Dispatch } from "react";
import { Link } from "react-router-dom";
import { Question } from "../models/Question";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
// import "../styles/HomePage.css";
import { Result } from "../models/Result";
import { AuthState } from "../store/reducers/auth-reducer";
import { fetchQuestions } from "../store/actions/questions";
import { fetchResults } from "../store/actions/results";
import { Navbar } from "react-bootstrap";

interface Props {
  questions: Question[];
  fetchQuestions: Function;
  results: Result[];
  fetchResults: Function;
  auth: AuthState;
}
interface State {}
class AppRoot extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.refreshPage();
  }

  refreshPage() {
    if (window.localStorage) {
      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload();
      } else localStorage.removeItem("firstLoad");
    }
  }

  componentDidMount() {
    // console.log(this.props.auth);
    if (this.props.questions.length === 0) this.props.fetchQuestions();
    if (this.props.results.length === 0) this.props.fetchResults();
  }

  render() {
    return (
      <div id="pocetna" className="d-flex flex-column text-center align-content-lg-start">
        {this.props.auth.user ? (
          <Navbar>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <h3>
                  Signed in as: {this.props.auth.user.name} {this.props.auth.user.surname}
                </h3>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        ) : (
          <Navbar>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text></Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        )}

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
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    questions: state.questions,
    results: state.results,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchResults: () => dispatch(fetchResults())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
