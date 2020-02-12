import React, { Component, Dispatch } from "react";
import { Question } from "../models/Question";
import { AppState } from "../store";
import { connect } from "react-redux";
import { selectQuestion } from "../store/actions/questions";
import { Action } from "redux";
import * as actions from "../store/actions/questions";
// import "../styles/ToSelectQuestion.css";
import { Redirect } from "react-router";
import PaginationComponent from "./PaginationComponent";

interface Props {
  questionList: Question[];
  questions: Question[];
  fetchNumberOfQuestions: Function;
  selectQuestion: Function;
  paginate: Function;
  fetchQuestions: Function;
}

interface State {
  redirect: boolean;
  currentPage: any;
  flag: boolean;
}
class ToSelectQuestion extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: false,
      currentPage: 1,
      flag: false
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

  paginatePage = (pageNumber: number) => this.setCurrentPage(pageNumber);

  setCurrentPage = (pageNumber: number) => {
    this.setState({
      currentPage: pageNumber
    });
    this.props.paginate("questions", pageNumber);
  };

  componentDidMount() {
    if (this.props.questionList.length === 0)
      this.props.paginate("questions", this.state.currentPage);
    if (this.props.questions.length === 0) this.props.fetchQuestions();
    console.log(this.props.questions);
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
                <th scope="row">{(this.state.currentPage - 1) * 10 + (index + 1)}</th>
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

        <PaginationComponent
          postsPerPage={10}
          totalPosts={this.props.questions.length}
          paginatePage={this.paginatePage}
          refresh={this.state.flag}
        />
        {/* <div className="d-flex col-5 offset-4">
          <button
            className="dugmeLoad btn btn-info btn-md"
            onClick={() => {
              this.props.fetchNumberOfQuestions();
            }}
          >
            Load more questions
          </button>
        </div> */}
      </div>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    questionList: state.questionList,
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
  return {
    selectQuestion: (question: Question) => dispatch(selectQuestion(question)),
    fetchNumberOfQuestions: () => dispatch(actions.fetchNumberOfQuestions()),
    fetchQuestions: () => dispatch(actions.fetchQuestions()),
    paginate: (collection: string, page: number) =>
      dispatch(actions.paginate(collection, page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToSelectQuestion);
