import React, { Component } from 'react';
import './Message.css';
import moment from 'moment'
class Message extends Component {
  render() {
    const className = this.props.me ? "message right appeared" : "message left appeared";
    return (
      <li className={className}>
        <div className="userName">{this.props.message.sender}</div>
        <div className="text_wrapper">
          <div className="text">{this.props.message.content}</div>
          <div className="time">{moment(this.props.message.timeStamp).fromNow()}</div>
        </div>
      </li>
    );
  }
}

export default Message;
