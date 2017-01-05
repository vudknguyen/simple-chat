import React, { Component } from 'react';
import './CurrentUser.css';

class CurrentUser extends Component {
  render() {
    return (
      <div className='currentUser'>
        <span>Me: <b>{this.props.me} </b></span>
        <a className='editLinkBtn' onClick={this.props.onEditNameClick}><i className='fa fa-pencil'></i></a>
      </div>
    );
  }
}

export default CurrentUser;
