import { Action } from "redux";
import { Card } from "../../models/Card";

export const FETCH_CARDS = "FETCH CARDS";
export const ADD_CARDS = "ADD CARDS";
export const SAVE_CARD = "SAVE CARD";
export const SAVE_CARD_SUCCESS = "SAVE CARD SUCCESS";
export const DELETE_CARD = "DELETE CARD";
export const DELETE_CARD_SUCCESS = "DELETE CARD SUCCESS";

export interface FetchCards extends Action {}
export interface AddCards extends Action {
  cards: Card[];
}
export interface SaveCard extends Action {
  card: Card;
}
export interface SaveCardSuccess extends Action {
  card: Card;
}
export interface DeleteCard extends Action {
  cardId: string;
}
export interface DeleteCardSuccess extends Action {
  cardId: string;
}

export function fetchCards(): FetchCards {
  return {
    type: FETCH_CARDS
  };
}
export function addCards(cards: Card[]): AddCards {
  return {
    type: ADD_CARDS,
    cards
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
