import React, { Component } from 'react';
import './UserPanel.css';

import Users from './Users';
import CurrentUserEditable from './CurrentUserEditable';

class UserPanel extends Component {
  _renderPanel() {
    switch (this.props.usersStatus) {
      case 'LOADING':
      case 'READY':
        return (<div className="users_panel">Loading users ...</div>)
      case 'LOADED':
        return (<div className="users_panel">
          <CurrentUserEditable me={this.props.me} onSubmitName={this.props.onSubmitName} />
          <Users users={this.props.users} />
        </div>);
      case 'FAILURE':
        return (<div className="users_panel">Error loading users ...</div>)
    }

  }
  render() {
    return this._renderPanel();
  }
}

export default UserPanel;
