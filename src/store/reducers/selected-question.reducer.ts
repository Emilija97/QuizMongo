import { Action } from "redux";
import { SELECT_QUESTION, SelectQuestion } from "../actions/questions";

export function selectedQuestionReducer(state = {}, action: Action) {
  switch (action.type) {
    case SELECT_QUESTION: {
      const { question } = action as SelectQuestion;
      return question;
    }
    default:
      return state;
  }
}
