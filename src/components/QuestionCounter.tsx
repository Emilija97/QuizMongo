import React, { Component, Dispatch } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import { Question } from "../models/Question";
// import "../styles/ToSelectQuestion.css";
interface Props {
  questions?: Question[];
}

interface State {}

class QuestionCounter extends Component<Props, State> {
  render() {
    if (!this.props.questions) {
      return <p className="font-italic font-weight-bold">Total Questions: 0</p>;
    }
    return (
      <div>
        <p className="counter font-italic font-weight-bold">
          Total Questions: {this.props.questions.length}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionCounter);
