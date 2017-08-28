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

  getKeysFromObj(obj) {
    return Object.keys(obj);
  }

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
      const keys = this.getKeysFromObj(this.props.data[0]);
      return keys.map((property) => {
        return (
          <th key={property}>
            {property}
          </th>
        );
      });
    }
  }

  renderRows() {
    const { editFunction, deleteFunction } = this.props;
    const getSingleRow = (key, values) => {
      return (
        <tr key={key}>
          {values}
        </tr>
      );
    }

    if (this.props.columns) {
      return this.props.data.map((obj) => {
        const values = this.props.columns.map((column) => {
          return (
            <td key={obj[column.key]}>{obj[column.key]}</td>
          );
        });
        values.push(
          <td key={'actions-' + obj}>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="xsmall" onClick={() => editFunction(obj)}><Glyphicon glyph="pencil"/></Button>
              <Button bsStyle="danger" bsSize="xsmall" onClick={() => deleteFunction(obj)}><Glyphicon glyph="trash"/></Button>
            </ButtonToolbar>
          </td>
        );
        return getSingleRow(obj[this.props.columns[0].key], values);
      });
    } else {
      return this.props.data.map((obj) => {
        const keys = this.getKeysFromObj(obj);
        const values = keys.map((key) => {
          return (
            <td key={obj[key]}>{obj[key]}</td>
          );
        });
        values.push(
          <td key={'actions-' + obj}>
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="xsmall" onClick={() => editFunction(obj)}><Glyphicon glyph="pencil"/></Button>
              <Button bsStyle="danger" bsSize="xsmall" onClick={() => deleteFunction(obj)}><Glyphicon glyph="trash"/></Button>
            </ButtonToolbar>
          </td>
        );
        return getSingleRow(obj[keys[0]], values);
      });
    }
  }

  render() {
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            {this.renderColumns()}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </Table>
    );
  }
}
