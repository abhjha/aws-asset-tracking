import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './index.css';

class ComingSoon extends Component {

  render() {
    return (
      <div className="coming-soon-container">
        <p>{this.props.label} Coming Soon!!!!!!</p>
      </div>
    );
  }
}

export default withRouter(ComingSoon);
