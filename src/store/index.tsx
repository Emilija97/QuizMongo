import { Question } from "../models/Question";
import { combineReducers } from "redux";
import { questionsReducer } from "./reducers/questions-reducer";
import { selectedQuestionReducer } from "./reducers/selected-question.reducer";
import { toSelectReducer } from "./reducers/toselect-reducer";
import { Result } from "../models/Result";
import { resultReducer } from "./reducers/result-reducer";
import { authReducer, AuthState } from "./reducers/auth-reducer";
import { CardItem } from "../models/CardItem";
import { cardReducer } from "./reducers/card-reducer";
import { cardListReducer } from "./reducers/cardlist-reducer";
import { editCardReducer } from "./reducers/editcard-reducer";

export interface AppState {
  questions: Question[];
  selected?: Question;
  questionList: Question[];
  results: Result[];
  auth: AuthState;
  cards: CardItem[];
  cardList: CardItem[];
  edited: CardItem;
}

export const rootReducer = combineReducers({
  questions: questionsReducer,
  selected: selectedQuestionReducer,
  questionList: toSelectReducer,
  results: resultReducer,
  auth: authReducer,
  cards: cardReducer,
  cardList: cardListReducer,
  edited: editCardReducer
});
