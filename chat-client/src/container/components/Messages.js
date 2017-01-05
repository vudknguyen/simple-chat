import React, { Component } from 'react';
import './Messages.css';

import Message from './Message';
class Messages extends Component {
  componentDidMount() {
    this.updateInterval = setInterval(() => this.forceUpdate(), 10000);
  }
  
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  componentDidUpdate(prevProps, prevState) {
    document.getElementById('bottom').scrollIntoView();
  }

  render() {
    const messages = this.props.messages.map((m, index) => {
      return (<Message key={index} message={m} me={this.props.myName === m.sender} />)
    });

    return (
      <ul className='messages'>
        {messages}
        <div id='bottom'> </div>
      </ul>
    );
  }
}

export default Messages;
