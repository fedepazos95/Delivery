// Dependencies
import React, { Component } from 'react';

// React Bootstrap Components
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>This is a simple delivery app.</p>
        </Jumbotron>
      </div>
    )
  }
}
