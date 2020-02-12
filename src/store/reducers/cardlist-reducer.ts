import { Action } from "redux";
import { CardItem } from "../../models/CardItem";
import {
  ADD_CARD_LIST,
  AddCardList,
  SEARCH_FOR_CARD_SUCCESS,
  SearchForCardSuccess,
  SEARCH_FOR_CARD_FAILURE,
  SearchForCardFailure
} from "../actions/cards";

const initialState: CardItem[] = [];

export function cardListReducer(state: CardItem[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_CARD_LIST: {
      const { cardList } = action as AddCardList;
      console.log(cardList.values);
      state = cardList;
      return state;
    }
    case SEARCH_FOR_CARD_SUCCESS: {
      const { cards } = action as SearchForCardSuccess;
      state = cards;
      return state;
    }
    case SEARCH_FOR_CARD_FAILURE: {
      const { errorMessage } = action as SearchForCardFailure;
      console.log(errorMessage);
      return initialState;
    }
    default:
      return state;
  }
}
