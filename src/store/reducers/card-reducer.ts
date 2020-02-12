import { Action } from "redux";
import { Card } from "../../models/Card";
import { SAVE_CARD_SUCCESS, SaveCardSuccess } from "../actions/cards";

const initialState: Card[] = [];

export function cardReducer(state: Card[] = initialState, action: Action) {
  switch (action.type) {
    case SAVE_CARD_SUCCESS: {
      const { card } = action as SaveCardSuccess;
      return [...state, card];
    }
  }
}
