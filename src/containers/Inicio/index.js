// Dependencies
import React, { Component } from 'react';

// React Bootstrap Components
import { Jumbotron } from 'react-bootstrap';

export default class Inicio extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Bienvenido!</h1>
          <p>Esto es una simple aplicación de administración de deliveries</p>
        </Jumbotron>
      </div>
    )
  }
}
