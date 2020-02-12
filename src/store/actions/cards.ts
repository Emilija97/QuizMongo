import { Action } from "redux";
import { CardItem } from "../../models/CardItem";

export const FETCH_CARDS = "FETCH CARDS";
export const ADD_CARDS = "ADD CARDS";
export const SAVE_CARD = "SAVE CARD";
export const SAVE_CARD_SUCCESS = "SAVE CARD SUCCESS";
export const DELETE_CARD = "DELETE CARD";
export const DELETE_CARD_SUCCESS = "DELETE CARD SUCCESS";

//For pagination
export const ADD_CARD_LIST = "ADD CARD LIST";

//SEARCH
export const SEARCH_FOR_CARD = "SEARCH FOR CARD";
export const SEARCH_FOR_CARD_SUCCESS = "SEARCH FOR CARD SUCCESS";
export const SEARCH_FOR_CARD_FAILURE = "SEARCH FOR CARD FAILURE";

export interface FetchCards extends Action {}
export interface AddCards extends Action {
  cards: CardItem[];
}
export interface SaveCard extends Action {
  card: CardItem;
}
export interface SaveCardSuccess extends Action {
  card: CardItem;
}
export interface DeleteCard extends Action {
  cardId: string;
}
export interface DeleteCardSuccess extends Action {
  cardId: string;
}

export interface AddCardList extends Action {
  cardList: CardItem[];
}

export interface SearchForCard extends Action {
  title: string;
}

export interface SearchForCardSuccess extends Action {
  cards: CardItem[];
}

export interface SearchForCardFailure extends Action {
  errorMessage: string;
}

export function fetchCards(): FetchCards {
  return {
    type: FETCH_CARDS
  };
}
export function addCards(cards: CardItem[]): AddCards {
  return {
    type: ADD_CARDS,
    cards
  };
}

export function saveCard(card: CardItem): SaveCard {
  return {
    type: SAVE_CARD,
    card
  };
}
export function saveCardSuccess(card: CardItem): SaveCardSuccess {
  return {
    type: SAVE_CARD_SUCCESS,
    card
  };
}

export function deleteCard(cardId: string): DeleteCard {
  return {
    type: DELETE_CARD,
    cardId
  };
}
export function deleteCardSuccess(cardId: string): DeleteCardSuccess {
  return {
    type: DELETE_CARD_SUCCESS,
    cardId
  };
}

export function addCardList(cardList: CardItem[]): AddCardList {
  return {
    type: ADD_CARD_LIST,
    cardList
  };
}

export function searchForCard(title: string): SearchForCard {
  return {
    type: SEARCH_FOR_CARD,
    title
  };
}

export function searchForCardSuccess(cards: CardItem[]): SearchForCardSuccess {
  return {
    type: SEARCH_FOR_CARD_SUCCESS,
    cards
  };
}

export function searchForCardFailure(errorMessage: string): SearchForCardFailure {
  return {
    type: SEARCH_FOR_CARD_FAILURE,
    errorMessage
  };
}
