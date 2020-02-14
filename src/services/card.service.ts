import { env } from "../App";
import { CardItem } from "../models/CardItem";

export function postNewCard(card: CardItem) {
  return fetch(`${env.url}/cards`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: card.id,
      date: card.date,
      title: card.title,
      username: card.username,
      field: card.field
    })
  });
}

export function getAllCards() {
  return fetch(`${env.url}/cards`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getAllCardsByUsername(username: string) {
  return fetch(`${env.url}/cards/createdby/${username}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function findCardByWord(title: string) {
  return fetch(`${env.url}/cards/search/${title}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function updateCardService(card: any) {
  console.log(card);
  return fetch(`${env.url}/cards/${card.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: card.id,
      username: card.username,
      date: card.date,
      title: card.title,
      field: card.field
    })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function deleteCardById(cardId: string) {
  console.log(cardId);
  return fetch(`${env.url}/cards/${cardId}`, {
    method: "DELETE"
  }).then(response => response.json());
}
