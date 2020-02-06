import { Question } from "../../models/Question";
import { Action } from "redux";
import {
  ADD_QUESTIONS,
  AddQuestions,
  ADD_QUESTION,
  AddQuestion,
  DELETE_QUESTION,
  DeleteQuestion
} from "../actions/questions";

// const initialState: Question[] = [
//   {
//     id: "100",
//     question: "List kog drveta se nalazi na zastavi Kanade?",
//     answer1: "Javor",
//     answer2: "Hrast",
//     answer3: "Kesten",
//     answer4: "Ginko",
//     correctAnswer: "A"
//   }
// ];

const initialState: Question[] = [];
export function questionsReducer(state: Question[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_QUESTIONS: {
      const { questions } = action as AddQuestions;
      //da napravi random niz koji ucita iz baze
      questions.sort(function() {
        return 0.5 - Math.random();
      });
      return [...state, ...questions];
    }
    case ADD_QUESTION: {
      const { question } = action as AddQuestion;
      return [...state, question];
    }
    case DELETE_QUESTION: {
      const { questionId } = action as DeleteQuestion;
      return state.filter((question: Question) => question.id !== questionId);
    }
    default: {
      return state;
    }
  }
}
