import React, { Component, Dispatch } from "react";
import { AppState } from "../store";
import { Action } from "redux";
import { connect } from "react-redux";
import { Question } from "../models/Question";
// import "../styles/ToSelectQuestion.css";
import { Redirect } from "react-router";

interface Props {
  selectedQuestion?: Question;
}

interface State {
  redirect: boolean;
}

class SelectedQuestion extends Component<Props, State> {
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
      return <Redirect to="/ToSelectQuestion" />;
    }
  };

  render() {
    if (!this.props.selectedQuestion) {
      return <p>Selektovano pitanje: -</p>;
    }
    return (
      <div className="d-flex flex-column align-content-center col-lg-7 offset-lg-2 py-5">
        {this.renderRedirect()}
        <p className="response font-weight-bold font-italic">
          Odgovor na pitanje: {this.props.selectedQuestion.question}{" "}
          {this.props.selectedQuestion.correctAnswer === "A"
            ? this.props.selectedQuestion.answer1
            : this.props.selectedQuestion.correctAnswer === "B"
            ? this.props.selectedQuestion.answer2
            : this.props.selectedQuestion.correctAnswer === "C"
            ? this.props.selectedQuestion.answer3
            : this.props.selectedQuestion.answer4}
        </p>
        <div className="d-flex col-5 offset-4">
          <button
            className="back btn btn-info"
            onClick={() => {
              this.setRedirect();
            }}
          >
            Back to select another question
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    selectedQuestion: state.selected
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedQuestion);
