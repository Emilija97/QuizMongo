import { Question } from "../models/Question";
import { env } from "../App";

export function getAllQuestions() {
  return fetch(`${env.url}/questions`).then(response => response.json());
}

export function postNewQuestion(question: Question) {
  return fetch(`${env.url}/questions`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: question.id,
      question: question.question,
      answer1: question.answer1,
      answer2: question.answer2,
      answer3: question.answer3,
      answer4: question.answer4,
      correctAnswer: question.correctAnswer
    })
  }).then(response => response.json());
}

export function deleteQuestionFromApi(questionId: string) {
  console.log("Usao sam u service i moj id je: " + questionId);
  return fetch(`${env.url}/questions/${questionId}`, {
    method: "DELETE"
  })
    .then(() => console.log("Deleted question with id: " + questionId))
    .catch(error => console.log(error));
}

export function getNumberOfQuestions(questionNumber: number) {
  console.log("Pribavljam");
  return fetch(`${env.url}/questions/${questionNumber}`)
    .then(response => response.json())
    .catch(error => console.log(error));
  // .then(response =>
  //   response.slice(
  //     questionNumber === 0 ? questionNumber : questionNumber - 1,
  //     questionNumber + 9
  //   )
  // );
}

export function loadCurrentPage(page: number) {
  console.log("Pribavljam");
  return fetch(`${env.url}/questions/${page}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}
