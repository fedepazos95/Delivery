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
    this.compareFunction = this.compareFunction.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  componentWillMount() {
    this.props.listDeliveries();
  }

  componentWillReceiveProps(newProps){
    // Si recibe como prop un objeto delivery quiere decir que esta creando o editando un delivery
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

  compareFunction(column) {
    if (column.ordenable) {
      const deliveries = this.props.deliveries.sort(function(a, b) {
         return a[column.key].localeCompare(b[column.key]);
      });
      this.setState({deliveries: deliveries});
    }
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
      // Si no tengo deliveries no renderizo la tabla
      return null;
    }

    if (filtroNombre) {
      deliveries = deliveries.filter((delivery) => {
        // Se fija si el valor de 'filtroNombre' coincide con el nombre
        if (delivery.nombre.toLowerCase().indexOf(filtroNombre) > -1) {
          return true;
        }
      });
    }
    if (filtroDireccion) {
      // Se fija si el valor de 'filtroDireccion' coincide con la direccion
      deliveries = deliveries.filter((delivery) => {
        if (delivery.direccion.toLowerCase().indexOf(filtroDireccion) > -1) {
          return true;
        }
      });
    }

    // Columnas predefinidas para enviar como prop en el componente Grilla
    const columns = [{ title: "Nombre", key: "nombre", ordenable: true },{ title: "Direccion", key: "direccion", ordenable: true },{ title: "Telefono", key: "telefono", ordenable: true }];

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

        <Grilla data={deliveries} columns={columns} widthPercent={100} editFunction={selectDelivery} deleteFunction={this.handleDeleteDelivery} orderBy={this.compareFunction}/>

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
