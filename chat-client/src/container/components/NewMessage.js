import React, { Component } from 'react';
import './NewMessage.css';
import { isEmpty } from 'validator'
class NewMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };

    this.onSend = this.onSend.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onSend(evt) {
    const content = this.state.content;

    evt.preventDefault();

    if (this.validate()) return;

    this.props.onSend({ content, timeStamp: Date.now() });
  }

  componentWillReceiveProps(updated) {
    this.setState({
      content: updated.message.content
    });
  }

  validate() {
    const message = this.state.content;
    if (isEmpty(message)) return true;

    return false
  }

  onChange(evt) {
    this.setState({
      content: evt.target.value
    });

    this.props.onTyping();

    const currentContent = evt.target.value;
    setTimeout(() => {
      if (this.state.content === currentContent) {
        this.props.onStopTyping();
      }
    }, 2000)
  }

  onBlur() {
    this.props.onStopTyping();
  }


  render() {
    return (
      <div className="bottom_wrapper clearfix">
        <form onSubmit={this.onSend}>
          <div className="message_input_wrapper">
            <input
              className="message_input"
              placeholder="Type your message here..."
              value={this.state.content}
              onChange={this.onChange}
              onBlur={this.onBlur} />
          </div>
          <div className="send_message" onClick={this.onSend}>
            <div className="text"><i className="fa fa-paper-plane"></i> Send</div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewMessage;
