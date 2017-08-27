// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// React Bootstrap Components
import { PageHeader, Modal, Panel, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

// Components
import Grilla from '../../components/Grilla';

class Deliveries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filtroNombre: "",
      filtroDireccion: "",
      showModal: false
    }
    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleDireccionChange = this.handleDireccionChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleNombreChange(e) {
    this.setState({
      filtroNombre: e.target.value
    })
  }
  handleDireccionChange(e) {
    this.setState({
      filtroDireccion: e.target.value
    })
  }

  render() {
    let { deliveries } = this.props;
    const { filtroNombre, filtroDireccion } = this.state;

    if (filtroNombre) {
      deliveries = deliveries.filter((delivery) => {
        if (delivery.nombre.toLowerCase().indexOf(filtroNombre) > -1) {
          return true;
        }
      });
    }
    if (filtroDireccion) {
      deliveries = deliveries.filter((delivery) => {
        if (delivery.direccion.toLowerCase().indexOf(filtroDireccion) > -1) {
          return true;
        }
      });
    }

    const columns = [
      {
        title: "Nombre",
        key: "nombre"
      },
      {
        title: "Direccion",
        key: "direccion"
      },
      {
        title: "Telefono",
        key: "telefono"
      }
    ];

    return (
      <div>
        <PageHeader>
          Listado de deliveries
          <Button
            onClick={this.openModal}
            bsStyle="primary"
            bsSize="sm"
            className="pull-right">
            <Glyphicon glyph="asterisk"/> Crear nuevo delivery
          </Button>
        </PageHeader>

        <Panel>
          <h4>
            <Glyphicon glyph="filter"/> Filtros
          </h4>
          <Form inline>
            <FormGroup>
              <ControlLabel>Nombre: </ControlLabel>
              <FormControl value={this.state.filtroNombre} type="text" placeholder="Parilla" onChange={this.handleNombreChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Direccion: </ControlLabel>
              <FormControl value={this.state.filtroDireccion} type="text" placeholder="Calle" onChange={this.handleDireccionChange}/>
            </FormGroup>
          </Form>
        </Panel>
        <Grilla data={deliveries} columns={columns}/>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    deliveries: state.deliveries
  };
}

export default connect(mapStateToProps)(Deliveries);
