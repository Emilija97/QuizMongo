import { Action } from "redux";
import { CardItem } from "../../models/CardItem";
import {
  SAVE_CARD_SUCCESS,
  SaveCardSuccess,
  ADD_CARDS,
  AddCards,
  DELETE_CARD_SUCCESS,
  DeleteCardSuccess,
  SEARCH_FOR_CARD_SUCCESS,
  SearchForCardSuccess,
  SEARCH_FOR_CARD_FAILURE,
  SearchForCardFailure
} from "../actions/cards";

const initialState: CardItem[] = [];

export function cardReducer(state: CardItem[] = initialState, action: Action) {
  switch (action.type) {
    case SAVE_CARD_SUCCESS: {
      const { card } = action as SaveCardSuccess;
      return [...state, card];
    }
    case ADD_CARDS: {
      const { cards } = action as AddCards;
      state = cards;
      return state;
    }
    case DELETE_CARD_SUCCESS: {
      const { cardId } = action as DeleteCardSuccess;
      return state.filter((card: CardItem) => card.id !== cardId);
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
