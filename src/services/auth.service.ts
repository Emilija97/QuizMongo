import { env } from "../App";
import { User } from "../models/User";
import uuid from "uuid";

export function logInUser(username: string, password: string) {
  console.log("Usao sam u service " + username + ", a password " + password);
  return fetch(`${env.url}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getUserById(id: string) {
  return fetch(`${env.url}/auth/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getUserByToken(token: string) {
  return fetch(`${env.url}/auth/me/from/token/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

export function getAllUsers() {
  return fetch(`${env.url}/users`).then(response => response.json());
}

export function registerUser(user: User) {
  return fetch(`${env.url}/users`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: uuid.v4().toString(),
      name: user.name,
      surname: user.surname,
      username: user.username,
      password: user.password
    })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
