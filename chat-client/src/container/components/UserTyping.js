import React, { Component } from 'react';
import './UserTyping.css';

class UserTyping extends Component {
  render() {
    let typingText = '';
    if (this.props.typingUsers.length === 1) {
      typingText = this.props.typingUsers.join(',') + ' is typing ...';
    }

    if (this.props.typingUsers.length > 1) {
      typingText = this.props.typingUsers.join(',') + ' are typing ...';
    }

    return (<div className='typing'>
      <span>{typingText}</span>
    </div>
    );
  }
}

export default UserTyping;
