import React, { Component } from 'react';
import './CurrentUserEditForm.css';

class CurrentUserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      submitDisabled: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitUsername = this.onSubmitUsername.bind(this);
  }

  onChange(evt) {
    // Disable submit button if user name is empty
    if (evt.target.value.trim() === '') {
      this.setState({
        value: evt.target.value,
        submitDisabled: true,
      });

      return;
    }

    this.setState({
      value: evt.target.value,
      submitDisabled: false,
    });
  }

  onSubmitUsername() {
    if (this.state.submitDisabled) {
      alert('Name is empty');
      return;
    }

    if (!this.props.onSubmit(this.state.value.trim())) {
      alert('Cannot choose this name, it already use by other person');
    }
  }

  render() {
    const submitClassName = this.state.submitDisabled ? 'linkBtn disabled' : 'linkBtn';
    return (
      <div className='currentUserEdit'>
        <input
          type='text'
          value={this.state.value}
          onChange={this.onChange} />
        <a className={submitClassName} onClick={this.onSubmitUsername}><i className='fa fa-check'></i></a>
        <a className='linkBtn' onClick={this.props.onCancel}><i className='fa fa-times'></i></a>
      </div>
    );
  }
}

export default CurrentUserEditForm;
