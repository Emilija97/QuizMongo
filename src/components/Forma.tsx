import React, { Component, Dispatch } from "react";
// import "../styles/QuestionList.css";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../store";
import { Action } from "redux";
import { Result } from "../models/Result";
import * as actions from "../store/actions/results";
import { AuthState } from "../store/reducers/auth-reducer";
import uuid from "uuid";

interface Props {
  score: number;
  maxScore: number;
  closePopup: Function;
  restartGame: Function;
  saveResult: Function;
  auth: AuthState;
}

interface State {
  redirectH: boolean;
  date: string;
}

class Popup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirectH: false,
      date: "" //new Date().toString()
    };
  }

  componentDidMount() {
    this.getDate();
    console.log(this.props.auth);
  }

  getDate = () => {
    const time = new Date().toString();
    this.setState({ date: time });
  };

  setRedirectH = () => {
    this.setState({
      redirectH: true
    });
  };
  renderRedirectH = () => {
    if (this.state.redirectH) {
      return <Redirect to="/HomePage" />;
    }
  };
  closePopup() {
    window.history.back();
  }

  render() {
    return (
      <div className="popup flex position-fixed h-50 mr-5 bg-light">
        {this.renderRedirectH()}
        <div className="popup_inner ml-5 mr-5">
          <h3 className="response font-italic text-center">
            Well done, you finished the game with {this.props.score} points of{" "}
            {this.props.maxScore}!
          </h3>
          <h3 className="font-italic text-center">Choose your next action:</h3>

          <div className="formaBack d-flex flex-column">
            <button
              className="back btn btn-block btn-outline-success"
              onClick={() => {
                this.props.restartGame();
                this.props.closePopup();
              }}
            >
              Back to play again quiz
            </button>
            <button
              className="back btn btn-block btn-outline-success"
              onClick={() => {
                const result: Result = {
                  id: uuid.v4().toString(),
                  date: this.state.date,
                  score: this.props.score,
                  username: this.props.auth.user.username
                };
                console.log("Result popup " + result.score);
                this.props.saveResult(result);
              }}
            >
              Save this result
            </button>
            <button
              className="back btn btn-block btn-outline-success"
              onClick={() => {
                this.setRedirectH();
              }}
            >
              Back to the home page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    saveResult: (result: Result) => dispatch(actions.saveResult(result))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
