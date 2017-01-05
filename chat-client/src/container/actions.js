import apiClient from '../apiClient';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
function saveMessageSuccess(message) {
  return { type: SEND_MESSAGE_SUCCESS, message };
}

export const CONNECT_REQUEST = 'CONNECT_REQUEST';
function connectRequest() {
  return { type: CONNECT_REQUEST }
}

export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export function connectSuccess() {
  return { type: CONNECT_SUCCESS };
}

export const CONNECT_FAILURE = 'CONNECT_FAILURE';
export function connectFailure(error) {
  return { type: CONNECT_FAILURE, error };
}

export const TRYING_RECONNECT = 'TRYING_RECONNECT';
export function tryReconnect() {
  return { type: TRYING_RECONNECT };
}

export const USER_CONNECTED = 'USER_CONNECTED';
export function userConnected(user) {
  return { type: USER_CONNECTED, user };
}

export const USER_DISCONNECTED = 'USER_DISCONNECTED';
export function userDisconnected(user) {
  return { type: USER_DISCONNECTED, user };
}

export const GET_MESSAGE_REQUEST = 'GET_MESSAGE_REQUEST';
export function getMessageRequest() {
  return { type: GET_MESSAGE_REQUEST }
}

export const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS';
export function getMessageSuccess(messages) {
  return { type: GET_MESSAGE_SUCCESS, messages }
}

export const GET_MESSAGE_FAILURE = 'GET_MESSAGE_FAILURE';
export function getMessageFailure(error) {
  return { type: GET_MESSAGE_FAILURE, error };
}

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export function getUsersRequest() {
  return { type: GET_USERS_REQUEST }
}

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users }
}

export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export function getUsersFailure(error) {
  return { type: GET_USERS_FAILURE, error };
}

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export function receiveMessage(message) {
  return { type: RECEIVE_MESSAGE, message };
}

export const SUBMIT_NAME = 'SUBMIT_NAME';
export function submitName(value) {
  return { type: SUBMIT_NAME, value };
}

export const USER_TYPING = 'USER_TYPING';
export function userTyping(user) {
  return { type: USER_TYPING, user };
}

export const USER_STOP_TYPING = 'USER_STOP_TYPING';
export function userStopTyping(user) {
  return { type: USER_STOP_TYPING, user };
}

export function sendMessage(message) {
  return function (dispatch) {
    dispatch(saveMessageSuccess(message))
  }
}

export function createConnection() {
  return function (dispatch) {
    dispatch(connectRequest())
  }
}

export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export function userNameChanged(updateName) {
  return { type: USERNAME_CHANGED, updateName }
}

export function getMessages() {
  return function (dispatch) {
    dispatch(getMessageRequest());
    apiClient.getMessages()
      .then(messages => {
        dispatch(getMessageSuccess(messages))
      })
      .catch(error => {
        dispatch(getMessageFailure(error.message))
      });
  }
}

export function getUsers() {
  return function (dispatch) {
    dispatch(getUsersRequest());
    apiClient.getUsers()
      .then(users => {
        dispatch(getUsersSuccess(users))
      })
      .catch(error => {
        dispatch(getUsersFailure(error.message))
      });
  }
}