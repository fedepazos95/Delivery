// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap Components
import { Table, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';

export default class Grilla extends Component {
  static propTypes = {
    editFunction: PropTypes.func.isRequired,
    deleteFunction: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    columns: PropTypes.array //array<Obj>
  };

  renderColumns() {
    if (this.props.columns) {
      return this.props.columns.map((column) => {
        return (
          <th key={column.key}>
            {column.title}
          </th>
        );
      });
    } else {
      //Por defecto toma el primer objeto del array y obtiene sus keys para usarlas como nombre de las columnas
      return Object.keys(this.props.data[0]).map((property) => {
        return (
          <th key={property}>
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
      values.push(
        <td key={'actions-' + delivery}>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="xsmall" onClick={() => editFunction(delivery)}><Glyphicon glyph="pencil"/></Button>
            <Button bsStyle="danger" bsSize="xsmall" onClick={() => deleteFunction(delivery)}><Glyphicon glyph="trash"/></Button>
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
    const columns = this.renderColumns();

    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            {columns}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows(columns)}
        </tbody>
      </Table>
    );
  }
}
