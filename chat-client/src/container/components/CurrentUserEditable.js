import React, { Component } from 'react';
import './CurrentUserEditable.css';

import CurrentUser from './CurrentUser';
import CurrentUserEditForm from './CurrentUserEditForm';

class CurrentUserEditable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    }

    this.onEditNameClick = this.onEditNameClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEditNameClick() {
    this.setState({
      editing: true,
    });
  }

  onSubmit(value) {
    this.setState({
      editing: false,
    });

    return this.props.onSubmitName(value);
  }

  onCancel() {
    this.setState({
      editing: false,
    });
  }

  render() {
    if (this.state.editing) {
      return <CurrentUserEditForm value={this.props.me} onSubmit={this.onSubmit} onCancel={this.onCancel} />
    } else {
      return (
        <CurrentUser me={this.props.me} onEditNameClick={this.onEditNameClick} />
      );
    }
  }
}

export default CurrentUserEditable;
