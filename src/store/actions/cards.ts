import { Action } from "redux";
import { CardItem } from "../../models/CardItem";

export const FETCH_CARDS = "FETCH CARDS";
export const FETCH_CARDS_USERNAME = "FETCH CARDS USERNAME";
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

//EDIT
export const EDIT_CARD = "EDIT CARD";
export const UPDATE_CARD = "UPDATE CARD";
export const UPDATE_CARD_SUCCESS = "UPDATE CARD SUCCESS";
export const UPDATE_CARD_FAILURE = "UPDATE CARD FAILURE";

export interface FetchCards extends Action {}

export interface FetchCardsByUsername extends Action {
  username: string;
}
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
  word: string;
}

export interface SearchForCardSuccess extends Action {
  cards: CardItem[];
}

export interface SearchForCardFailure extends Action {
  errorMessage: string;
}

export interface EditCard extends Action {
  card: CardItem;
}

export interface UpdateCard extends Action {
  payload: any;
}
export interface UpdateCardSuccess extends Action {
  payload: any;
}
export interface UpdateCardFailure extends Action {
  errorMessage: string;
}

export function fetchCards(): FetchCards {
  return {
    type: FETCH_CARDS
  };
}

export function fetchCardsByUsername(username: string): FetchCardsByUsername {
  return {
    type: FETCH_CARDS_USERNAME,
    username
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

export function searchForCard(word: string): SearchForCard {
  return {
    type: SEARCH_FOR_CARD,
    word
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

export function editCard(card: CardItem): EditCard {
  return {
    type: EDIT_CARD,
    card
  };
}

export function updateCard(payload: any): UpdateCard {
  return {
    type: UPDATE_CARD,
    payload
  };
}

export function updateCardSuccess(payload: any): UpdateCardSuccess {
  return {
    type: UPDATE_CARD_SUCCESS,
    payload
  };
}

export function updateCardFailure(errorMessage: string): UpdateCardFailure {
  return {
    type: UPDATE_CARD_FAILURE,
    errorMessage
  };
}
