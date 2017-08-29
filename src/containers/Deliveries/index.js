// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listDeliveries, selectDelivery, newDelivery, deleteDelivery } from '../../actions/index';
import { bindActionCreators } from 'redux';

// React Bootstrap Components
import { Modal, PageHeader, Panel, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

// Components
import Grilla from '../../components/Grilla';
import FormDelivery from '../../components/FormDelivery';

class Deliveries extends Component {
  static propTypes = {
    deliveries: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalDelete: false,
      filtroNombre: "",
      delivery: null
    }
    this.handleDeleteDelivery = this.handleDeleteDelivery.bind(this);
    this.handleNewDelivery = this.handleNewDelivery.bind(this);
    this.handleDeleteDelivery = this.handleDeleteDelivery.bind(this);
    this.handleFiltroNombreChange = this.handleFiltroNombreChange.bind(this);
    this.handleFiltroDireccionChange = this.handleFiltroDireccionChange.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  componentWillMount() {
    this.props.listDeliveries();
  }

  componentWillReceiveProps(newProps){
    if (newProps.delivery) {
      this.setState({showModal: true});
    }
  }

  handleNewDelivery() {
    this.setState({showModal: true});
    this.props.newDelivery();
  }

  handleDeleteDelivery(delivery) {
    this.setState({delivery: delivery, showModalDelete: true});
  }

  handleFiltroNombreChange(e) {
    this.setState({
      filtroNombre: e.target.value
    })
  }

  handleFiltroDireccionChange(e) {
    this.setState({
      filtroDireccion: e.target.value
    })
  }

  confirmDelete(){
    this.setState({showModalDelete: false});
    this.props.deleteDelivery(this.state.delivery);
  }

  closeDeleteModal() {
    this.setState({showModalDelete: false});
  }

  render() {
    let { deliveries } = this.props;
    const { delivery, selectDelivery, deleteDelivery } = this.props;
    const { filtroNombre, filtroDireccion, showModal } = this.state;

    if (!deliveries.length) {
      return null;
    }

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

    const columns = [{ title: "Nombre", key: "nombre" },{ title: "Direccion", key: "direccion" },{ title: "Telefono", key: "telefono" }];

    return (
      <div>
        <PageHeader>
          Listado de deliveries
          <Button
            onClick={this.handleNewDelivery}
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
              <FormControl value={this.state.filtroNombre} type="text" placeholder="Parilla" onChange={this.handleFiltroNombreChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Direccion: </ControlLabel>
              <FormControl value={this.state.filtroDireccion} type="text" placeholder="Calle" onChange={this.handleFiltroDireccionChange}/>
            </FormGroup>
          </Form>
        </Panel>

        <Grilla data={deliveries} columns={columns} editFunction={selectDelivery} deleteFunction={this.handleDeleteDelivery}/>

        {delivery ? <FormDelivery delivery={delivery}/> : null}

        <Modal bsSize="sm" show={this.state.showModalDelete} onHide={this.closeDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeDeleteModal}>Cancelar</Button>
            <Button bsStyle="danger" onClick={this.confirmDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    deliveries: state.deliveries.deliveries,
    delivery: state.deliveries.delivery
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ listDeliveries: listDeliveries, selectDelivery: selectDelivery, newDelivery: newDelivery, deleteDelivery: deleteDelivery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);
