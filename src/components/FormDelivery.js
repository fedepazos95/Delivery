// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveDelivery, unselectDelivery } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import FormErrors from './FormErrors';

// React Bootstrap Components
import { Modal, PageHeader, Col, FormGroup, FormControl, ControlLabel, Form, FieldGroup, Checkbox, Button, HelpBlock } from 'react-bootstrap';

// Schemas
import { getDeliverySchema, getValidDeliverySchema, getInputsRestrictions } from '../schemas/index';

class FormDelivery extends Component {
  static propTypes = {
    delivery: PropTypes.object.isRequired,
    showModal: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      showModal: false,
      formValid: false,
      delivery: getDeliverySchema(),
      formErrors: getDeliverySchema(),
      validSchema: getValidDeliverySchema(),
      inputsRestrictions: getInputsRestrictions()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  componentWillMount() {
    console.log('will mount');
    this.setState({showModal: true});
    if (Object.keys(this.props.delivery).length > 0) {
      this.setFormToEdit(this.props.delivery);
    } else {
      this.setFormToNew();
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('will receive props', newProps);
    console.log(this.state);
    this.setState({showModal: true, formValid: false});
    if (Object.keys(newProps.delivery).length > 0) {
      this.setFormToEdit(newProps.delivery);
    } else {
      this.setState({showModal: false});
      this.setFormToNew();
    }
  }

  setFormToEdit(delivery) {
    let { validSchema } = this.state;
    Object.keys(validSchema).map((fieldName) => {
      validSchema[fieldName] = true;
    });
    this.setState({formValid: true, validSchema: validSchema, title: 'Edición Delivery', delivery: delivery});
  }

  setFormToNew() {
    this.setState({title: 'Nuevo Delivery', delivery: getDeliverySchema()});
  }

  closeModal() {
    this.setState({ showModal: false });
    this.props.unselectDelivery(this.props.delivery);
  }

  getValidationState(prop, limit) {
    const length = this.state.delivery[prop].length;
    if (length > limit) {
      return 'error';
    }
  }

  handleSaveClick() {
    if (this.state.formValid) {
      this.props.saveDelivery(this.state.delivery);
    } else {
      alert('hay errores');
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { delivery } = this.state;
    delivery[name] = value;
    this.setState({delivery}, () => this.validateField(name, value));
  }

  validateField(fieldName, value){
    const { inputsRestrictions } = this.state;
    let fieldValidationErrors = this.state.formErrors;
    let validSchema = this.state.validSchema;

    switch(fieldName) {
      case 'especialidades':
        if (value) {
          validSchema[fieldName] = value.length <= inputsRestrictions[fieldName];
        }
        break;
      default:
        if (value) {
          validSchema[fieldName] = value.length <= inputsRestrictions[fieldName];
          fieldValidationErrors[fieldName] = validSchema[fieldName] ? '' : 'es demasiado largo.';
        } else {
          validSchema[fieldName] = false;
        }
        break;
    }
    this.setState({formErrors: fieldValidationErrors, validSchema: validSchema}, this.validateForm);
  }

  validateForm(){
    const { validSchema } = this.state;
    let isValid = true;
    Object.keys(validSchema).map((fieldName) => {
      if (!validSchema[fieldName]) {
        isValid = false;
      }
    });
    this.setState({formValid: isValid});
  }

  render() {
    const { delivery, title, inputsRestrictions, formValid } = this.state;

    return (
      <div>
        <Modal bsSize="large" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup controlId="formNombre" validationState={this.getValidationState('nombre', inputsRestrictions.nombre)}>
                <ControlLabel>Nombre</ControlLabel>
                <FormControl name="nombre" type="text" value={delivery.nombre} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formTelefono" validationState={this.getValidationState('telefono', inputsRestrictions.telefono)}>
                <ControlLabel>Teléfono</ControlLabel>
                <FormControl name="telefono" type="text" value={delivery.telefono} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formDescripcion" validationState={this.getValidationState('descripcion', inputsRestrictions.descripcion)}>
                <ControlLabel>Descripcion</ControlLabel>
                <FormControl name="descripcion" componentClass="textarea" value={delivery.descripcion} onChange={this.handleInputChange} />
                <HelpBlock>{(1000-delivery.descripcion.length < 0) ? 'Excedió el limite.' : `Restan ${inputsRestrictions.descripcion-delivery.descripcion.length} caracteres.`}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formEspecialidades" validationState={this.getValidationState('especialidades', inputsRestrictions.especialidades)}>
                <ControlLabel>Especialidades</ControlLabel>
                <FormControl name="especialidades" componentClass="textarea" value={delivery.especialidades} onChange={this.handleInputChange} />
                <HelpBlock>{(500-delivery.especialidades.length < 0) ? 'Excedió el limite.' : `Restan ${inputsRestrictions.especialidades-delivery.especialidades.length} caracteres.`}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formDireccion" validationState={this.getValidationState('direccion', inputsRestrictions.direccion)}>
                <ControlLabel>Dirección</ControlLabel>
                <FormControl name="direccion" type="text" value={delivery.direccion} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <Col sm={6}>
                <PageHeader><small>Contacto Administrativo</small></PageHeader>
                  <FormGroup controlId="formAdministrativoNombre">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl name="admNombre" type="text" value={delivery.admNombre} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoApellido">
                    <ControlLabel>Apellido</ControlLabel>
                    <FormControl name="admApellido" type="text" value={delivery.admApellido} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoTelefono">
                    <ControlLabel>Telefono</ControlLabel>
                    <FormControl name="admTelefono" type="text" value={delivery.admTelefono} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoEmail">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="admEmail" type="text" value={delivery.admEmail} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
              </Col>

              <Col sm={6}>
                <PageHeader><small>Contacto Comercial</small></PageHeader>
                  <FormGroup controlId="formComercialNombre">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl name="cmNombre" type="text" value={delivery.cmNombre} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialApellido">
                    <ControlLabel>Apellido</ControlLabel>
                    <FormControl name="cmApellido" type="text" value={delivery.cmApellido} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialTelefono">
                    <ControlLabel>Telefono</ControlLabel>
                    <FormControl name="cmTelefono" type="text" value={delivery.cmTelefono} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialEmail">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="cmEmail" type="text" value={delivery.cmEmail} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
              </Col>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Cerrar</Button>
            <Button bsStyle="success" onClick={this.handleSaveClick} disabled={!formValid}>Guardar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    delivery: state.deliveries.delivery
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveDelivery: saveDelivery, unselectDelivery: unselectDelivery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDelivery);
