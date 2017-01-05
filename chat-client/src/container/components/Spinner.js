import React, { Component } from 'react';
import './Spinner.css';
class Spinner extends Component {
  render() {
    return (
      <div className='loading'>
        <span>
          <i className='fa fa-circle-o-notch fa-spin fa-3x'></i> 
            <br /> 
            {this.props.message || 'Loading...'}
        </span>
      </div>
    );
  }
}

export default Spinner;
