import React, { Component } from 'react';
import './ChatPanel.css';

import Messages from './Messages';
import NewMessage from './NewMessage';
import UserTyping from './UserTyping';
import Spinner from './Spinner';
class ChatPanel extends Component {
  
  _renderPanel() {
    switch (this.props.messagesStatus) {
      case 'LOADING':
      case 'READY':
      default:
        return (<div className="chat_window">
          <Spinner message='Getting messages...'/>
        </div>);
      case 'LOADED':
        return (<div className="chat_window">
          <Messages
            messages={this.props.messages}
            myName={this.props.myName} />
          <UserTyping typingUsers={this.props.typingUsers} />
          <NewMessage 
            onSend={this.props.onSend} 
            message={this.props.message}
            onTyping={this.props.onTyping}
            onStopTyping={this.props.onStopTyping} />
        </div>);
      case 'FAILURE':
        return (<div className="chat_window">Error loading message ...</div>);
    }
  }
  render() {

    return this._renderPanel();
  }
}

export default ChatPanel;
