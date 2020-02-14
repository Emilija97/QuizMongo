import { Action } from "redux";
import {
  EDIT_CARD,
  EditCard,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAILURE,
  UpdateCardSuccess,
  UpdateCardFailure
} from "../actions/cards";

export function editCardReducer(state = {}, action: Action) {
  switch (action.type) {
    case EDIT_CARD: {
      const { card } = action as EditCard;
      return card;
    }
    case UPDATE_CARD_SUCCESS: {
      const { payload } = action as UpdateCardSuccess;
      return payload;
    }
    case UPDATE_CARD_FAILURE: {
      const { errorMessage } = action as UpdateCardFailure;
      console.log(errorMessage);
      return state;
    }
    default:
      return state;
  }
}
