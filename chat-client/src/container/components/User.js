import React, { Component } from 'react';
import './User.css';

class User extends Component {

  render() {
    return (
      <li className="user">
        <span>{this.props.user} - online</span>
      </li>
    );
  }
}

export default User;
