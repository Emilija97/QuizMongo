import { Action } from "redux";
import { Question } from "../../models/Question";

export const FETCH_QUESTIONS = "FETCH QUESTIONS";
export const ADD_QUESTIONS = "ADD QUESTIONS";
export const SELECT_QUESTION = "SELECT QUESTION";
export const ADD_QUESTION = "ADD QUESTION";
export const FETCH_NUMQUESTIONS = "FETCH NUMQUESTIONS";
export const ADD_NUMQUESTIONS = "ADD NUMQUESTIONS";
export const FETCH_NEW_QUESTION = "FETCH NEW QUESTION";
export const DELETE_QUESTION_SAGA = "DELETE QUESTION SAGA";
export const DELETE_QUESTION = "DELETE QUESTION";

//Pagination
export const LOAD_PAGE = "LOAD PAGE";

export interface FetchQuestions extends Action { }
export interface AddQuestions extends Action {
    questions: Question[];
}
export interface SelectQuestion extends Action {
    question: Question;
}
export interface AddQuestion extends Action {
    question: Question;
}
export interface DeleteQuestion extends Action {
    questionId: string;
}
export interface DeleteQuestionSaga extends Action {
    questionId: string;
}
export interface FetchNumberOfQuestions extends Action { }
export interface FetchNewQuestion extends Action {
    question: Question;
}
export interface AddNumQuestions extends Action {
    questionList: Question[];
}

export interface LoadPage extends Action { }

export function fetchQuestions(): FetchQuestions {
    return {
        type: FETCH_QUESTIONS
    };
}
export function addQuestions(questions: Question[]): AddQuestions {
    return {
        type: ADD_QUESTIONS,
        questions: questions
    };
}
export function selectQuestion(question: Question): SelectQuestion {
    return {
        type: SELECT_QUESTION,
        question: question
    };
}
export function addQuestion(question: Question): AddQuestion {
    return {
        type: ADD_QUESTION,
        question
    };
}
export function deleteQuestion(questionId: string): DeleteQuestion {
    return {
        type: DELETE_QUESTION,
        questionId
    };
}
export function deleteQuestionSaga(questionId: string): DeleteQuestionSaga {
    return {
        type: DELETE_QUESTION_SAGA,
        questionId
    };
}
export function fetchNumberOfQuestions(): FetchNumberOfQuestions {
    return {
        type: FETCH_NUMQUESTIONS
    };
}
export function addNumQuestions(questionList: Question[]): AddNumQuestions {
    return {
        type: ADD_NUMQUESTIONS,
        questionList
    };
}

export function fetchNewQuestion(question: Question): FetchNewQuestion {
    return {
        type: FETCH_NEW_QUESTION,
        question
    };
}

export function loadPage(): LoadPage {
    return {
        type: LOAD_PAGE
    };
}
