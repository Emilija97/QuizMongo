import React, { Component, Dispatch } from "react";
import { Question } from "../models/Question";
import { AppState } from "../store";
import { connect } from "react-redux";
import { selectQuestion } from "../store/actions";
import { Action } from "redux";
import * as actions from "../store/actions";
// import "../styles/ToSelectQuestion.css";
import { Redirect } from "react-router";

interface Props {
  questionList: Question[];
  fetchNumberOfQuestions: Function;
  selectQuestion: Function;
}

interface State {
  redirect: boolean;
}
class ToSelectQuestion extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
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
      return <Redirect to="/SelectedQuestion" />;
    }
  };

  componentDidMount() {
    if (this.props.questionList.length === 0) this.props.fetchNumberOfQuestions();
  }

  render() {
    if (!this.props.questionList) {
      return <h1>There isn't any question to select!</h1>;
    }
    return (
      <div className="d-flex flex-column align-content-center col-lg-7 offset-lg-2 py-5">
        {this.renderRedirect()}
        <h3 className="font-italic">
          Get information what is correct answer on some question:
        </h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Question</th>
              <th scope="col">Choose</th>
            </tr>
          </thead>
          <tbody>
            {this.props.questionList.map((question: Question, index: number) => (
              <tr key={question.id}>
                <th scope="row">{index}</th>
                <td>{question.question}</td>
                <td>
                  <button
                    className="dugmeSelect btn btn-info"
                    onClick={() => {
                      this.props.selectQuestion(question);
                      this.setRedirect();
                    }}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex col-5 offset-4">
          <button
            className="dugmeLoad btn btn-info btn-md"
            onClick={() => {
              this.props.fetchNumberOfQuestions();
            }}
          >
            Load more questions
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    questionList: state.questionList
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    selectQuestion: (question: Question) => dispatch(selectQuestion(question)),
    fetchNumberOfQuestions: () => dispatch(actions.fetchNumberOfQuestions())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToSelectQuestion);
