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

export function findCardByTitle(title: string) {
  return fetch(`${env.url}/cards/search/${title}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}
