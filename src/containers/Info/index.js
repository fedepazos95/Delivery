// Dependencies
import React, { Component } from 'react';

// Components
import Grilla from '../../components/Grilla';

export default class Info extends Component {
  render() {
    const data = [
      {
        tarea: "Pantalla deliveries",
        done: "X"
      }
    ];
    return (
      <div>
        <p>Esto es la pagina de info</p>
        <Grilla data={data} />
      </div>
    )
  }
}
