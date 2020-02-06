import { Question } from "../models/Question";
import { combineReducers } from "redux";
import { questionsReducer } from "./reducers/questions-reducer";
import { selectedQuestionReducer } from "./reducers/selected-question.reducer";
import { toSelectReducer } from "./reducers/toselect-reducer";
import { Result } from "../models/Result";
import { resultReducer } from "./reducers/result-reducer";
import { authReducer, AuthState } from "./reducers/auth-reducer";

export interface AppState {
  questions: Question[];
  selected?: Question;
  questionList: Question[];
  results: Result[];
  auth: AuthState;
}

export const rootReducer = combineReducers({
  questions: questionsReducer,
  selected: selectedQuestionReducer,
  questionList: toSelectReducer,
  results: resultReducer,
  auth: authReducer
});
