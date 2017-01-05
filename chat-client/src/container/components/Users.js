import React, { Component } from 'react';
import './Users.css';

import User from './User';
class Users extends Component {

  render() {
    const users = this.props.users.map((u, index) => {
      return (<User key={index} user={u} />)
    });

    return (
      <div className="users">
        {users}
      </div>
    );
  }
}

export default Users;
