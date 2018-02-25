// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listDeliveries, selectDelivery, newDelivery, deleteDelivery } from '../../actions/index';
import { bindActionCreators } from 'redux';

// React Bootstrap Components
import { Modal, PageHeader, Panel, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

// Components
import Grid from '../../components/Grid';
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
      filterName: "",
      filterDirection: "",
      delivery: null
    }
    this.handleDeleteDelivery = this.handleDeleteDelivery.bind(this);
    this.handleNewDelivery = this.handleNewDelivery.bind(this);
    this.handleDeleteDelivery = this.handleDeleteDelivery.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.compareFunction = this.compareFunction.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
  }

  componentDidMount() {
    this.props.listDeliveries();
  }

  componentWillReceiveProps(newProps){
    // If newProps have a delivery object it means that is editing or creating a delivery
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

  handleFilterChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
    const { filterName, filterDirection, showModal } = this.state;

    if (filterName) {
      deliveries = deliveries.filter((delivery) => {
        if (delivery.name.toLowerCase().indexOf(filterName) > -1) {
          return true;
        }
      });
    }
    if (filterDirection) {
      deliveries = deliveries.filter((delivery) => {
        if (delivery.direction.toLowerCase().indexOf(filterDirection) > -1) {
          return true;
        }
      });
    }

    // Columns array to send as a prop for Grid.js
    const columns = [{ title: "Name", key: "name", ordenable: true },{ title: "Direction", key: "direction", ordenable: true },{ title: "Phone", key: "phone", ordenable: true }];

    return (
      <div>
        <PageHeader>
          Deliveries
          <Button
            onClick={this.handleNewDelivery}
            bsStyle="primary"
            bsSize="sm"
            className="pull-right">
            <Glyphicon glyph="asterisk"/> Add new delivery
          </Button>
        </PageHeader>

        <Panel>
          <h4>
            <Glyphicon glyph="filter"/> Filters
          </h4>
          <Form inline>
            <FormGroup>
              <ControlLabel>Name: </ControlLabel>
              <FormControl value={this.state.filterName} type="text" name="filterName" placeholder="Parilla" onChange={this.handleFilterChange}/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Direction: </ControlLabel>
              <FormControl value={this.state.filterDirection} type="text" name="filterDirection" placeholder="Calle" onChange={this.handleFilterChange}/>
            </FormGroup>
          </Form>
        </Panel>

        <Grid data={deliveries} columns={columns} widthPercent={100} editFunction={selectDelivery} deleteFunction={this.handleDeleteDelivery} orderBy={this.compareFunction}/>

        {delivery ? <FormDelivery delivery={delivery}/> : null}

        <Modal bsSize="sm" show={this.state.showModalDelete} onHide={this.closeDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={this.closeDeleteModal}>Cancel</Button>
            <Button bsStyle="danger" onClick={this.confirmDelete}>Delete</Button>
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
