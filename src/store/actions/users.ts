import { Action } from "redux";
import { User } from "../../models/User";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_FAILURE = "LOGIN FAILURE";
export const CHECK_USER = "CHECK USER";
export const CHECK_USER_SUCCESS = "CHECK USER SUCCESS";
export const CHECK_USER_FAILURE = "CHECK USER FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER SUCCESS";
export const REGISTER_FAILURE = "REGISTER FAILURE";

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = "ME FROM TOKEN";
export const ME_FROM_TOKEN_SUCCESS = "ME FROM TOKEN SUCCESS";
export const ME_FROM_TOKEN_FAILURE = "ME FROM TOKEN FAILURE";
export const RESET_TOKEN = "RESET TOKEN";

//Actions for update user data
export const UPDATE = "UPDATE";
export const UPDATE_SUCCESS = "UPDATE SUCCESS";
export const UPDATE_FAILURE = "UPDATE FAILURE";

export interface LogIn extends Action {
  username: string;
  password: string;
}

export interface LogInSuccess extends Action {
  // user: User;
  payload: any;
}
export interface LogInFailure extends Action {
  errorMessage: string;
}

export interface CheckUser extends Action {
  id: string;
}
export interface CheckUserSuccess extends Action {
  user: User;
}
export interface CheckUserFailure extends Action {
  errorMessage: string;
}

export interface Register extends Action {
  user: User;
}
export interface RegisterSuccess extends Action {
  // user: User;
  payload: any;
}
export interface RegisterFailure extends Action {
  errorMessage: string;
}
export interface LogOut extends Action {}

export interface MeFromToken extends Action {
  tokenFromStorage: string;
}
export interface MeFromTokenSuccess extends Action {
  payload: any;
}
export interface MeFromTokenFailure extends Action {
  errorMessage: string;
}

export interface ResetToken extends Action {}

export interface Update extends Action {
  payload: any;
}
export interface UpdateSuccess extends Action {
  // user: User;
  payload: any;
}
export interface UpdateFailure extends Action {
  errorMessage: string;
}

export function logIn(username: string, password: string): LogIn {
  return {
    type: LOGIN,
    username,
    password
  };
}

export function logInSuccess(payload: any): LogInSuccess {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}

export function logInFailure(errorMessage: string): LogInFailure {
  return {
    type: LOGIN_FAILURE,
    errorMessage
  };
}

export function checkUser(id: string): CheckUser {
  return {
    type: CHECK_USER,
    id
  };
}

export function checkUserSuccess(user: User): CheckUserSuccess {
  return {
    type: CHECK_USER_SUCCESS,
    user
  };
}
export function checkUserFailure(errorMessage: string): CheckUserFailure {
  return {
    type: CHECK_USER_FAILURE,
    errorMessage
  };
}
export function logOut(): LogOut {
  return {
    type: LOGOUT
  };
}

export function register(user: User): Register {
  return {
    type: REGISTER,
    user
  };
}

export function registerSuccess(payload: any): RegisterSuccess {
  return {
    type: REGISTER_SUCCESS,
    payload
  };
}

export function registerFailure(errorMessage: string): RegisterFailure {
  return {
    type: REGISTER_FAILURE,
    errorMessage
  };
}

export function meFromToken(tokenFromStorage: string): MeFromToken {
  return {
    type: ME_FROM_TOKEN,
    tokenFromStorage
  };
}

export function meFromTokenSuccess(payload: any): MeFromTokenSuccess {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload
  };
}

export function meFromTokenFailure(errorMessage: string): MeFromTokenFailure {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    errorMessage
  };
}

export function resetToken(): ResetToken {
  //used for logout
  return {
    type: RESET_TOKEN
  };
}

export function update(payload: any): Update {
  return {
    type: UPDATE,
    payload
  };
}

export function updateSuccess(payload: any): UpdateSuccess {
  return {
    type: UPDATE_SUCCESS,
    payload
  };
}

export function updateFailure(errorMessage: string): UpdateFailure {
  return {
    type: UPDATE_FAILURE,
    errorMessage
  };
}
