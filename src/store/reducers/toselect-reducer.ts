import { Action } from "redux";
import {
  ADD_NUMQUESTIONS,
  AddNumQuestions,
  DELETE_QUESTION,
  DeleteQuestion,
  ADD_QUESTION,
  AddQuestion
} from "../actions/questions";
import { Question } from "../../models/Question";

const initialState: Question[] = [];

export function toSelectReducer(state: Question[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_NUMQUESTIONS: {
      const { questionList } = action as AddNumQuestions;
      console.log(questionList.values);
      state = questionList;
      return state;
    }
    case ADD_QUESTION: {
      const { question } = action as AddQuestion;
      if (state.length < 10) return [...state, question];
      else return state;
    }
    case DELETE_QUESTION: {
      const { questionId } = action as DeleteQuestion;
      return state.filter((question: Question) => question.id !== questionId);
    }
    default:
      return state;
  }
}
