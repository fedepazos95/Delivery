// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listDeliveries, selectDelivery, newDelivery } from '../../actions/index';
import { bindActionCreators } from 'redux';

// React Bootstrap Components
import { PageHeader, Panel, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

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
      filtroNombre: "",
      delivery: null
    }
    this.handleNewDelivery = this.handleNewDelivery.bind(this);
    this.handleNombreChange = this.handleNombreChange.bind(this);
    this.handleDireccionChange = this.handleDireccionChange.bind(this);
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
    const { delivery } = this.props;
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

    const { showModal } = this.state;
    const { selectDelivery } = this.props;

    const deleteFunction = () => {
      console.log('delete');
    }

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
              <FormControl value={this.state.filtroNombre} type="text" placeholder="Parilla" onChange={this.handleNombreChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Direccion: </ControlLabel>
              <FormControl value={this.state.filtroDireccion} type="text" placeholder="Calle" onChange={this.handleDireccionChange}/>
            </FormGroup>
          </Form>
        </Panel>

        <Grilla data={deliveries} columns={columns} editFunction={selectDelivery} deleteFunction={deleteFunction}/>

        {delivery ? <FormDelivery delivery={delivery}/> : null}

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
  return bindActionCreators({ listDeliveries: listDeliveries, selectDelivery: selectDelivery, newDelivery: newDelivery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Deliveries);
