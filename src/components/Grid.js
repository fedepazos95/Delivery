// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Bootstrap Components
import { Table, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';

export default class Grid extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array,
    widthPercent: PropTypes.number,
    editFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
    orderBy: PropTypes.func
  };

  renderColumns() {
    if (this.props.columns) {
      // The grid have an array with columns
      return this.props.columns.map((column) => {
        return (
          <th key={column.key} onClick={() => this.props.orderBy(column)} className="cursor-pointer">
            {column.title}
          </th>
        );
      });
    } else {
      // If there is no array with columns, takes the first object to render and use his keys as names for the columns
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

    return this.props.data.map((obj, key) => {
      const values = columns.map((column, key) => {
        return (
          <td key={key}>{obj[column.key]}</td>
        );
      });
      // Before render each row, add actions buttons
      values.push(
        <td key={'actions-' + obj}>
          <ButtonToolbar>
            {editFunction ? <Button bsStyle="primary" bsSize="xsmall" onClick={() => editFunction(obj)}><Glyphicon glyph="pencil"/></Button> : null}
            {deleteFunction ? <Button bsStyle="danger" bsSize="xsmall" onClick={() => deleteFunction(obj)}><Glyphicon glyph="trash"/></Button> : null}
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
            {editFunction && deleteFunction ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {this.renderRows(columns)}
        </tbody>
      </Table>
    );
  }
}
