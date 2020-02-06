import { Action } from "redux";
import { Result } from "../../models/Result";

export const SAVE_RESULT = "SAVE RESULT";
export const SAVE_RESULT_SUCCESS = "SAVE RESULT SUCCESS";
export const FETCH_RESULTS = "FETCH RESULTS";
export const ADD_RESULTS = "ADD RESULTS";
export const DELETE_RESULT = "DELETE RESULT";
export const DELETE_RESULT_SUCCESS = "DELETE RESULT SUCCESS";

export interface SaveResult extends Action {
    result: Result;
}
export interface SaveResultSuccess extends Action {
    result: Result;
}

export interface FetchResults extends Action { }
export interface AddResults extends Action {
    results: Result[];
}

export interface DeleteResult extends Action {
    resultId: string;
}
export interface DeleteResultSuccess extends Action {
    resultId: string;
}

export function saveResult(result: Result): SaveResult {
    return {
        type: SAVE_RESULT,
        result
    };
}
export function saveResultSuccess(result: Result): SaveResultSuccess {
    return {
        type: SAVE_RESULT_SUCCESS,
        result
    };
}

export function fetchResults(): FetchResults {
    return {
        type: FETCH_RESULTS
    };
}
export function addResults(results: Result[]): AddResults {
    return {
        type: ADD_RESULTS,
        results
    };
}

export function deleteResult(resultId: string): DeleteResult {
    return {
        type: DELETE_RESULT,
        resultId
    };
}
export function deleteResultSuccess(resultId: string): DeleteResultSuccess {
    return {
        type: DELETE_RESULT_SUCCESS,
        resultId
    };
}