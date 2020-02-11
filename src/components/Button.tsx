import React, { Component } from "react";
import { Question } from "../models/Question";
// import "../styles/QuestionList.css";

interface Props {
  naslov: string;
  question: Question;
  increaseScore: Function;
  flagGame: boolean;
  togglePopup: Function;
  answer: string;
}

interface State {
  className: string;
  disabled: boolean;
}

class MojeDugme extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      className: "btn btn-outline-info btn-block",
      disabled: false
    };
  }

  render() {
    return (
      <button
        type="button"
        disabled={this.state.disabled}
        className={this.state.className}
        onClick={() => {
          this.checkAnswer();
        }}
      >
        {this.props.naslov}
      </button>
    );
  }

  checkAnswer = () => {
    if (this.props.question.correctAnswer === this.props.answer) {
      this.props.increaseScore();
      this.setState({
        className: "btn btn-success btn-block",
        disabled: true
      });
    } else if (this.props.flagGame === true) {
      //if the mode of game is chosen number, we don't need popup until the end
      this.setState({
        className: "btn btn-danger btn-block",
        disabled: true
      });
    } else {
      this.setState({
        className: "btn btn-danger btn-block",
        disabled: true
      });
      setTimeout(() => this.props.togglePopup(), 500);
    }
  };
}

export default MojeDugme;
