import { User } from "../models/User";
import { Action } from "redux";
import {
  LOGIN_SUCCESS,
  LogInSuccess,
  LOGIN_FAILURE,
  LogInFailure,
  CHECK_USER,
  CheckUser,
  CHECK_USER_SUCCESS,
  CheckUserSuccess,
  CHECK_USER_FAILURE,
  CheckUserFailure,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RegisterSuccess,
  RegisterFailure,
  ME_FROM_TOKEN,
  ME_FROM_TOKEN_SUCCESS,
  ME_FROM_TOKEN_FAILURE,
  MeFromToken,
  MeFromTokenSuccess,
  MeFromTokenFailure
} from "./actions";

export interface AuthState {
  user: User;
  token: string | null;
  isLoading: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
  registered: boolean;
}

const initialState: AuthState = {
  user: {
    id: "",
    username: "",
    password: "",
    name: "",
    surname: "",
    score: 0
  },
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  errorMessage: "",
  registered: false
};

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { payload } = action as LogInSuccess;
      console.log("Reducer auth: " + payload.user);
      localStorage.setItem("token", payload.token);
      return {
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false,
        errorMessage: "",
        registered: false
      };
    }
    case LOGIN_FAILURE: {
      const { errorMessage } = action as LogInFailure;
      const newState = {
        user: {
          id: "",
          username: "",
          password: "",
          name: "",
          surname: "",
          score: 0
        },
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errorMessage: errorMessage,
        registered: false
      };
      return newState;
    }
    case CHECK_USER_SUCCESS: {
      const { user } = action as CheckUserSuccess;
      return {
        user,
        token: null,
        isAuthenticated: true,
        isLoading: false,
        errorMessage: "",
        registered: false
      };
    }
    case CHECK_USER_FAILURE: {
      const { errorMessage } = action as CheckUserFailure;
      localStorage.removeItem("token");
      return {
        user: {
          id: "",
          username: "",
          password: "",
          name: "",
          surname: "",
          score: 0
        },
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errorMessage: errorMessage,
        registered: false
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return initialState;
    }
    case REGISTER_SUCCESS: {
      const { payload } = action as RegisterSuccess;
      console.log("Success" + payload.user);
      localStorage.setItem("token", payload.token);
      return {
        user: payload.user,
        token: payload.token,
        isAuthenticated: false,
        isLoading: false,
        errorMessage: "",
        registered: true
      };
    }
    case REGISTER_FAILURE: {
      const { errorMessage } = action as RegisterFailure;
      return {
        token: null,
        user: {
          id: "",
          username: "",
          password: "",
          name: "",
          surname: "",
          score: 0
        },
        isAuthenticated: false,
        isLoading: false,
        errorMessage: errorMessage,
        registered: false
      };
    }
    // case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
    // { const {tokenFromStorage} = action as MeFromToken;
    //   return { ...state, user: null, isAuthenticated: false,
    //   isLoading: true,
    //   errorMessage: "",
    //   registered: false}; }
    case ME_FROM_TOKEN_SUCCESS: {
      //return user, status = authenticated and make loading = false
      const { payload } = action as MeFromTokenSuccess;
      console.log(payload);
      console.log("Iz reducera " + payload.user);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false,
        errorMessage: "",
        registered: false
      };
    } //<-- authenticated
    case ME_FROM_TOKEN_FAILURE: {
      // return error and make loading = false
      const { errorMessage } = action as MeFromTokenFailure;

      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        errorMessage: errorMessage,
        registered: false
      };
    }
    default: {
      return state;
    }
  }
}
