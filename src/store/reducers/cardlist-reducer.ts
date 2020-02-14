import { Action } from "redux";
import { CardItem } from "../../models/CardItem";
import { ADD_CARD_LIST, AddCardList } from "../actions/cards";

const initialState: CardItem[] = [];

export function cardListReducer(state: CardItem[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_CARD_LIST: {
      const { cardList } = action as AddCardList;
      console.log(cardList.values);
      state = cardList;
      return state;
    }
    default:
      return state;
  }
}
