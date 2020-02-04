import { Action } from "redux";
import { ADD_NUMQUESTIONS, AddNumQuestions } from "./actions";
import { Question } from "../models/Question";

const initialState: Question[] = [];

export function toSelectReducer(state: Question[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_NUMQUESTIONS: {
      const { questionList } = action as AddNumQuestions;
      return [...state, ...questionList];
    }
    default:
      return state;
  }
}
