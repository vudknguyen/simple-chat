import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChatWindow.css';
import _ from 'lodash';
import config from '../config';

import ChatPanel from './components/ChatPanel';
import UserPanel from './components/UserPanel';
import Spinner from './components/Spinner';
import {
  sendMessage, createConnection, connectSuccess, connectFailure,
  tryReconnect, receiveMessage, userConnected, userDisconnected,
  getMessages, getUsers, submitName, userNameChanged,
  userTyping, userStopTyping
} from './actions';
import io from 'socket.io-client';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onTyping = this.onTyping.bind(this);
    this.onStopTyping = this.onStopTyping.bind(this);
  }

  componentDidMount() {
    this.props.connect();
    this.socket = io(config.serverUrl, { timeout: 8000 });
    this.socket.on('connect', () => { this.connected() });
    this.socket.on('error', (error) => { console.log(error) });
    this.socket.on('reconnecting', (t) => { this.props.tryReconnect() });
    this.socket.on('chat message', (msg) => {
      console.log('Debug: Chat Message', msg);
      this.props.receiveMessage(msg);
    });
    this.socket.on('user connected', (user) => {
      console.log('Debug: User connected: ', user);
      this.props.userConnected(user);
    });
    this.socket.on('user disconnected', (user) => {
      console.log('Debug: User disconnected: ', user);
      this.props.userDisconnected(user);
    });
    this.socket.on('user name change', ({prevName, newName}) => {
      this.props.userNameChanged({ prevName, newName });
    });
    this.socket.on('user typing', user => {
      console.log('Debug: User typing', user);
      if (!_.find(this.props.typingUsers, u => u === user)) {
        this.props.userTyping(user);
      }
    });
    this.socket.on('user stop typing', user => {
      console.log('Debug: User stop typing', user);
      this.props.userStopTyping(user);
    });
  }

  onSubmitName(value) {
    if (this.props.users.filter(u => u === value).length > 0) {
      return false;
    }

    if (this.props.myName !== value) {
      this.socket.emit('user name change', value);
      this.props.onSubmitName(value);
    }

    return true;
  }

  connected() {
    this.props.connected();
    this.socket.emit('user connected', this.props.myName);
    this.props.getMessages();
    this.props.getUsers();
  }

  onSend(message) {
    message.sender = this.props.myName;
    this.socket.emit('chat message', message);
    this.props.send(message);
  }

  onTyping() {
    this.socket.emit('user typing', this.props.myName);
    console.log('Type');
  }

  onStopTyping() {
    this.socket.emit('user stop typing', this.props.myName);
    console.log('Stop type');
  }

  _loading() {
    return (<Spinner message='Connecting...' />)
  }

  _chat() {
    return (
      <div>
        <UserPanel
          usersStatus={this.props.usersStatus}
          me={this.props.myName}
          users={this.props.users}
          onSubmitName={this.onSubmitName}
          />
        <ChatPanel
          messagesStatus={this.props.messagesStatus}
          messages={this.props.messages}
          myName={this.props.myName}
          onSend={this.onSend}
          message={this.props.message}
          typingUsers={this.props.typingUsers}
          onTyping={this.onTyping}
          onStopTyping={this.onStopTyping}
          />
      </div>
    )
  }

  _connectionError() {
    return (
      <div>Error: {this.props.error}</div>
    )
  }

  render() {
    switch (this.props.status) {
      case 'READY':
      case 'CONNECTING':
      default:
        return this._loading();
      case 'CONNECTED':
        return this._chat();
      case 'CONNECTION_ERROR':
        return this._connectionError();
    }
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    myName: state.myName,
    message: state.message,
    status: state.status,
    error: state.error,
    users: state.users,
    messagesStatus: state.messagesStatus,
    usersStatus: state.usersStatus,
    typingUsers: state.typingUsers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    send: (message) => {
      dispatch(sendMessage(message));
    },
    connect: () => {
      dispatch(createConnection());
    },
    connected: (e) => {
      console.log('Debug: Connected');
      dispatch(connectSuccess())
    },
    connectFailure: (e) => {
      console.log('Debug: Connect failure');
      dispatch(connectFailure())
    },
    tryReconnect: () => {
      console.log('Debug: Trying Reconnect')
      dispatch(tryReconnect());
    },
    receiveMessage: (msg) => {
      dispatch(receiveMessage(msg));
    },
    userConnected: (user) => {
      dispatch(userConnected(user));
    },
    userDisconnected: (user) => {
      dispatch(userDisconnected(user));
    },
    getMessages: () => {
      dispatch(getMessages());
    },
    getUsers: () => {
      dispatch(getUsers());
    },
    onSubmitName: (name) => {
      dispatch(submitName(name));
    },
    userNameChanged: (updateName) => {
      dispatch(userNameChanged(updateName));
    },
    userTyping: (user) => {
      dispatch(userTyping(user));
    },
    userStopTyping: (user) => {
      dispatch(userStopTyping(user));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
