// Dependencies
import React, { Component } from 'react';

// React Bootstrap Components
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p>This is a simple app for management of deliveries</p>
        </Jumbotron>
      </div>
    )
  }
}
