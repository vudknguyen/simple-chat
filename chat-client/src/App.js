import React, { Component } from 'react';
import './App.css';

import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './container/reducer.js';
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

import ChatWindow from './container/ChatWindow';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ChatWindow />
      </Provider>
    );
  }
}

export default App;
