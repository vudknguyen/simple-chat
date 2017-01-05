import {
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_FAILURE,
  TRYING_RECONNECT,
  SEND_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  SUBMIT_NAME,
  USERNAME_CHANGED,
  USER_TYPING,
  USER_STOP_TYPING,
} from './actions.js';
import fishNames from 'fish-names';

const initialState = {
  messages: [],
  users: [],
  myName: fishNames.random(),
  message: {
    content: ''
  },
  status: 'READY',
  messagesStatus: 'READY',
  usersStatus: 'READY',
  isLoadingUser: false,
  error: false,
  typingUsers: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        messages: [...state.messages, action.message],
        message: { content: '' }
      });
    case RECEIVE_MESSAGE: {
      return Object.assign({}, state, {
        messages: [...state.messages, action.message],
      });
    }
    case CONNECT_REQUEST:
      return Object.assign({}, state, {
        status: 'CONNECTING',
        error: false,
      });
    case CONNECT_SUCCESS:
      return Object.assign({}, state, {
        status: 'CONNECTED',
        error: false,
      });
    case CONNECT_FAILURE:
      return Object.assign({}, state, {
        status: 'CONNECTION_ERROR',
        error: action.error
      });
    case TRYING_RECONNECT:
      return Object.assign({}, state, {
        status: 'CONNECTING',
        error: false,
      });
    case USER_CONNECTED:
      return Object.assign({}, state, {
        users: [...state.users, action.user],
      });
    case USER_DISCONNECTED:
      return Object.assign({}, state, {
        users: state.users.filter(u => u !== action.user),
      });
    case GET_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        messagesStatus: 'LOADING',
        error: false,
      });
    case GET_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        messagesStatus: 'LOADED',
        messages: [...action.messages],
        error: false,
      });
    case GET_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        messagesStatus: 'FAILURE',
        error: action.error
      });
    case GET_USERS_REQUEST:
      return Object.assign({}, state, {
        usersStatus: 'LOADING',
        error: false,
      });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        usersStatus: 'LOADED',
        users: [...action.users.map(u => u.user).filter(u => u !== state.myName)],
        error: false,
      });
    case GET_USERS_FAILURE:
      return Object.assign({}, state, {
        usersStatus: 'FAILURE',
        error: action.error
      });
    case SUBMIT_NAME:
      const oldName = state.myName;
      const messagesSt = Object.assign([], state.messages);
      messagesSt.filter(m => m.sender === oldName).forEach(m => { m.sender = action.value });
      return Object.assign({}, state, {
        myName: action.value,
        messages: messagesSt,
      });
    case USERNAME_CHANGED:
      const messages = Object.assign([], state.messages);
      messages.filter(m => m.sender === action.updateName.prevName).forEach(m => { m.sender = action.updateName.newName });
      return Object.assign({}, state, {
        messages,
        users: state.users.map(u => {
          if (u === action.updateName.prevName) {
            return action.updateName.newName;
          }

          return u;
        }),
      });
    case USER_TYPING:
      return Object.assign({}, state, {
        typingUsers: [...state.typingUsers, action.user],
      });
    case USER_STOP_TYPING:
      return Object.assign({}, state, {
        typingUsers: state.typingUsers.filter(u => u !== action.user),
      });
    default:
      return state;
  }
}
