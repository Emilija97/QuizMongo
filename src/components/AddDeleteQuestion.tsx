import React, { Component, Dispatch } from "react";
import { Question } from "../models/Question";
import { AppState } from "../store";
import { connect } from "react-redux";
import { Action } from "redux";
import { fetchQuestions, deleteQuestionSaga, fetchNewQuestion } from "../store/actions";
// import "../styles/AddDelete.css";
import QuestionCounter from "./QuestionCounter";
import uuid from "uuid";

interface Props {
  questions: Question[];
  fetchQuestions: Function;
  deleteQuestionSaga: Function;
  fetchNewQuestion: Function;
}

interface State {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: string;
}
const initialState = {
  id: 0,
  question: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  correctAnswer: ""
};
class AddDeleteQuestion extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    //da ne bi doslo do ucitavanja istih pitanja vise puta, nego da moze sa bilo koje stranice
    if (this.props.questions.length === 0) this.props.fetchQuestions();
  }
  render() {
    if (!this.props.questions) {
      return <h1>There isn't any question to delete!</h1>;
    }
    return (
      <div id="addDelete" className="flex flex-column col-xl-7 offset-xl-2 py-5">
        <h3 className="text-center">Choose action, delete or add some question:</h3>
        <div id="izmene" className="d-flex flex-row justify-content-xl-between">
          <div id="deleteDiv" className="d-flex flex-column mr-5">
            <h3>Delete question:</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Question</th>
                  <th scope="col">Choose</th>
                </tr>
              </thead>
              <tbody>
                {this.props.questions.map((question: Question, index: number) => (
                  <tr key={question.id}>
                    <th scope="row">{index}</th>
                    <td>{question.question}</td>
                    <td>
                      <button
                        className="deleteBtn btn btn-info"
                        onClick={() => {
                          this.props.deleteQuestionSaga(question.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            id="addDiv"
            className="d-flex flex-column text-center align-items-left col-5 ml-5"
          >
            <h3>Add question:</h3>
            <form>
              <label htmlFor="question">Question: </label>
              <input
                type="text"
                className="form-control"
                name="question"
                value={this.state.question}
                onChange={e => this.setState({ question: e.target.value })}
              />
              <label htmlFor="answer1">Answer A: </label>
              <input
                type="text"
                className="form-control"
                name="answer1"
                value={this.state.answer1}
                onChange={e => this.setState({ answer1: e.target.value })}
              />
              <label htmlFor="answer2">Answer B: </label>
              <input
                type="text"
                className="form-control"
                name="answer2"
                value={this.state.answer2}
                onChange={e => this.setState({ answer2: e.target.value })}
              />
              <label htmlFor="answer3">Answer C: </label>
              <input
                type="text"
                className="form-control"
                name="answer3"
                value={this.state.answer3}
                onChange={e => this.setState({ answer3: e.target.value })}
              />
              <label htmlFor="answer4">Answer D: </label>
              <input
                type="text"
                className="form-control"
                name="answer4"
                value={this.state.answer4}
                onChange={e => this.setState({ answer4: e.target.value })}
              />
              <label htmlFor="correctanswer">Correct answer is A, B, C or D: </label>
              <input
                type="text"
                className="form-control"
                name="correctanswer"
                value={this.state.correctAnswer}
                onChange={e => this.setState({ correctAnswer: e.target.value })}
              />

              <br />
            </form>
            <button
              className="addBtn btn btn-info"
              onClick={() => {
                const question: Question = {
                  id: uuid.v4().toString(),
                  question: this.state.question,
                  answer1: this.state.answer1,
                  answer2: this.state.answer2,
                  answer3: this.state.answer3,
                  answer4: this.state.answer4,
                  correctAnswer: this.state.correctAnswer
                };
                this.props.fetchNewQuestion(question);
              }}
            >
              Add
            </button>
          </div>
        </div>
        <QuestionCounter />
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
  return {
    fetchQuestions: () => dispatch(fetchQuestions()),
    fetchNewQuestion: (question: Question) => dispatch(fetchNewQuestion(question)),
    deleteQuestionSaga: (questionId: string) => dispatch(deleteQuestionSaga(questionId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeleteQuestion);
