// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap Components
import { Table, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';

export default class Grilla extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array, //array<Obj>
    widthPercent: PropTypes.number, //Porcentaje para definir tamaño
    editFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    orderBy: PropTypes.func
  };

  renderColumns() {
    if (this.props.columns) {
      // Llego con un array de columnas definido
      return this.props.columns.map((column) => {
        return (
          <th key={column.key} onClick={() => this.props.orderBy(column)} className="cursor-pointer">
            {column.title}
          </th>
        );
      });
    } else {
      //Por defecto toma el primer objeto del array y obtiene sus keys para usarlas como nombre de las columnas
      return Object.keys(this.props.data[0]).map((property) => {
        return (
          <th key={property} onClick={() => this.props.orderBy(column)}>
            {property}
          </th>
        );
      });
    }
  }

  renderRows(columns) {
    const { editFunction, deleteFunction } = this.props;

    return this.props.data.map((delivery, key) => {
      const values = columns.map((column, key) => {
        return (
          <td key={key}>{delivery[column.key]}</td>
        );
      });
      // Luego de generar automaticamente cada campo de la fila, agrego los botones de acciones
      values.push(
        <td key={'actions-' + delivery}>
          <ButtonToolbar>
            {editFunction ? <Button bsStyle="primary" bsSize="xsmall" onClick={() => editFunction(delivery)}><Glyphicon glyph="pencil"/></Button> : null}
            {deleteFunction ? <Button bsStyle="danger" bsSize="xsmall" onClick={() => deleteFunction(delivery)}><Glyphicon glyph="trash"/></Button> : null}
          </ButtonToolbar>
        </td>
      );
      return (
        <tr key={key}>
          {values}
        </tr>
      )
    })
  }

  render() {
    const { widthPercent, editFunction, deleteFunction } = this.props;
    const columns = this.renderColumns();

    return (
      <Table striped bordered condensed hover responsive style={{"width": widthPercent+"%"}}>
        <thead>
          <tr>
            {columns}
            {editFunction && deleteFunction ? <th>Acciones</th> : null}
          </tr>
        </thead>
        <tbody>
          {this.renderRows(columns)}
        </tbody>
      </Table>
    );
  }
}
