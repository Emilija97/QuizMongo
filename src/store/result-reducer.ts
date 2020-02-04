import { Action } from "redux";
import {
  SAVE_RESULT_SUCCESS,
  SaveResultSuccess,
  ADD_RESULTS,
  AddResults,
  DELETE_RESULT_SUCCESS,
  DeleteResult
} from "./actions";
import { Result } from "../models/Result";

const initialState: Result[] = [];

export function resultReducer(state: Result[] = initialState, action: Action) {
  switch (action.type) {
    case SAVE_RESULT_SUCCESS: {
      const { result } = action as SaveResultSuccess;
      return [...state, result];
    }
    case ADD_RESULTS: {
      const { results } = action as AddResults;
      return [...state, ...results];
    }
    case DELETE_RESULT_SUCCESS: {
      const { resultId } = action as DeleteResult;
      return state.filter((result: Result) => result.id !== resultId);
    }
    default:
      return state;
  }
}
