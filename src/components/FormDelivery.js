// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveDelivery, updateDelivery, unselectDelivery } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// React Bootstrap Components
import { Modal, PageHeader, Col, FormGroup, FormControl, ControlLabel, Form, FieldGroup, Checkbox, Button, HelpBlock } from 'react-bootstrap';

// Schemas
import { getDeliverySchema, getValidDeliverySchema, getInputsRestrictions } from '../schemas/index';

class FormDelivery extends Component {
  static propTypes = {
    delivery: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      showModal: false,
      formValid: false,
      isEditing: false,
      checkboxIdem: false,
      delivery: getDeliverySchema(),
      validSchema: getValidDeliverySchema(),
      inputsRestrictions: getInputsRestrictions()
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  componentWillMount() {
    this.setState({showModal: true});
    if (Object.keys(this.props.delivery).length > 0) {
      this.setFormToEdit(this.props.delivery);
    } else {
      this.setFormToNew();
    }
  }

  componentWillReceiveProps(newProps) {
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
    this.setState({isEditing: true, formValid: true, validSchema: validSchema, title: 'Edición Delivery', delivery: delivery});
  }

  setFormToNew() {
    this.setState({isEditing: false, title: 'Nuevo Delivery', delivery: getDeliverySchema()});
  }

  closeModal() {
    this.setState({ showModal: false });
    this.props.unselectDelivery(this.props.delivery);
  }

  handleSaveClick() {
    this.setState({ showModal: false });
    if (this.state.checkboxIdem) {
      const { delivery } = this.state;
      delivery.cmNombre = delivery.admNombre;
      delivery.cmApellido = delivery.admApellido;
      delivery.cmTelefono = delivery.admTelefono;
      delivery.cmEmail = delivery.admEmail;
      this.setState({delivery: delivery});
    }
    if (this.state.isEditing) {
      this.props.updateDelivery(this.state.delivery);
    } else {
      this.props.saveDelivery(this.state.delivery);
    }
  }

  handleCheckboxChange() {
    let schema = this.state.validSchema;
    schema.cmNombre = schema.cmApellido = schema.cmTelefono = schema.cmEmail = !this.state.checkboxIdem;
    this.setState({ validSchema: schema, checkboxIdem: !this.state.checkboxIdem }, this.validateForm);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { delivery } = this.state;
    delivery[name] = value;
    this.setState({delivery}, () => this.validateField(name, value));
  }

  getValidationState(prop, limit) {
    const length = this.state.delivery[prop].length;
    if (!this.state.validSchema[prop] || length > limit) {
      return 'error';
    }
  }

  validateField(fieldName, value){
    const { inputsRestrictions } = this.state;
    let fieldValidationErrors = this.state.formErrors;
    let validSchema = this.state.validSchema;

    switch(fieldName) {
      case 'admEmail':
        validSchema[fieldName] = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'cmEmail':
        validSchema[fieldName] = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'especialidades':
        if (value) {
          validSchema[fieldName] = value.length <= inputsRestrictions[fieldName];
        }
        break;
      default:
        if (value) {
          validSchema[fieldName] = value.length <= inputsRestrictions[fieldName];
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
                <ControlLabel>Nombre {(this.state.validSchema.nombre) ? '' : '*'}</ControlLabel>
                <FormControl name="nombre" type="text" value={delivery.nombre} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formTelefono" validationState={this.getValidationState('telefono', inputsRestrictions.telefono)}>
                <ControlLabel>Teléfono {(this.state.validSchema.telefono) ? '' : '*'}</ControlLabel>
                <FormControl name="telefono" type="text" value={delivery.telefono} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formDescripcion" validationState={this.getValidationState('descripcion', inputsRestrictions.descripcion)}>
                <ControlLabel>Descripcion {(this.state.validSchema.descripcion) ? '' : '*'}</ControlLabel>
                <FormControl name="descripcion" componentClass="textarea" value={delivery.descripcion} onChange={this.handleInputChange} />
                <HelpBlock>{(inputsRestrictions.descripcion-delivery.descripcion.length < 0) ? 'Excedió el limite.' : `Restan ${inputsRestrictions.descripcion-delivery.descripcion.length} caracteres.`}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formEspecialidades" validationState={this.getValidationState('especialidades', inputsRestrictions.especialidades)}>
                <ControlLabel>Especialidades {(this.state.validSchema.especialidades) ? '' : '*'}</ControlLabel>
                <FormControl name="especialidades" componentClass="textarea" value={delivery.especialidades} onChange={this.handleInputChange} />
                <HelpBlock>{(inputsRestrictions.especialidades-delivery.especialidades.length < 0) ? 'Excedió el limite.' : `Restan ${inputsRestrictions.especialidades-delivery.especialidades.length} caracteres.`}</HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup controlId="formDireccion" validationState={this.getValidationState('direccion', inputsRestrictions.direccion)}>
                <ControlLabel>Dirección {(this.state.validSchema.direccion) ? '' : '*'}</ControlLabel>
                <FormControl name="direccion" type="text" value={delivery.direccion} onChange={this.handleInputChange}/>
                <FormControl.Feedback />
              </FormGroup>

              <Col sm={6}>
                <PageHeader><small>Contacto Administrativo</small></PageHeader>
                  <FormGroup controlId="formAdministrativoNombre" validationState={this.getValidationState('admNombre', inputsRestrictions.admNombre)}>
                    <ControlLabel>Nombre {(this.state.validSchema.admNombre) ? '' : '*'}</ControlLabel>
                    <FormControl name="admNombre" type="text" value={delivery.admNombre} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoApellido" validationState={this.getValidationState('admApellido', inputsRestrictions.admApellido)}>
                    <ControlLabel>Apellido {(this.state.validSchema.admApellido) ? '' : '*'}</ControlLabel>
                    <FormControl name="admApellido" type="text" value={delivery.admApellido} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoTelefono" validationState={this.getValidationState('admTelefono', inputsRestrictions.admTelefono)}>
                    <ControlLabel>Telefono {(this.state.validSchema.admTelefono) ? '' : '*'}</ControlLabel>
                    <FormControl name="admTelefono" type="text" value={delivery.admTelefono} onChange={this.handleInputChange}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formAdministrativoEmail" validationState={this.getValidationState('admEmail', inputsRestrictions.admEmail)}>
                    <ControlLabel>Email {(this.state.validSchema.admEmail) ? '' : '*'}</ControlLabel>
                    <FormControl name="admEmail" type="text" value={delivery.admEmail} onChange={this.handleInputChange}/>
                    <HelpBlock>{(!this.state.validSchema.admEmail) ? 'El formato ingresado es incorrecto.' : ''}</HelpBlock>
                    <FormControl.Feedback />
                  </FormGroup>
              </Col>

              <Col sm={6}>
                <PageHeader><small>Contacto Comercial</small></PageHeader>
                  <FormGroup controlId="formComercialNombre" validationState={this.getValidationState('cmNombre', inputsRestrictions.cmNombre)}>
                    <ControlLabel>Nombre {(this.state.validSchema.cmNombre) ? '' : '*'}</ControlLabel>
                    <FormControl name="cmNombre" type="text" value={delivery.cmNombre} onChange={this.handleInputChange} disabled={this.state.checkboxIdem}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialApellido" validationState={this.getValidationState('cmApellido', inputsRestrictions.cmApellido)}>
                    <ControlLabel>Apellido {(this.state.validSchema.cmApellido) ? '' : '*'}</ControlLabel>
                    <FormControl name="cmApellido" type="text" value={delivery.cmApellido} onChange={this.handleInputChange} disabled={this.state.checkboxIdem}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialTelefono" validationState={this.getValidationState('cmTelefono', inputsRestrictions.cmTelefono)}>
                    <ControlLabel>Telefono {(this.state.validSchema.cmTelefono) ? '' : '*'}</ControlLabel>
                    <FormControl name="cmTelefono" type="text" value={delivery.cmTelefono} onChange={this.handleInputChange} disabled={this.state.checkboxIdem}/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formComercialEmail" validationState={this.getValidationState('cmEmail', inputsRestrictions.cmEmail)}>
                    <ControlLabel>Email {(this.state.validSchema.cmEmail) ? '' : '*'}</ControlLabel>
                    <FormControl name="cmEmail" type="text" value={delivery.cmEmail} onChange={this.handleInputChange} disabled={this.state.checkboxIdem}/>
                    <HelpBlock>{(!this.state.validSchema.cmEmail) ? 'El formato ingresado es incorrecto.' : ''}</HelpBlock>
                    <FormControl.Feedback />
                  </FormGroup>
                  <Checkbox checked={this.checkboxIdem} onChange={this.handleCheckboxChange} readOnly>
                    Idem contacto administrativo
                  </Checkbox>
              </Col>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!formValid ? <HelpBlock>Los campos con un * son obligatorios.</HelpBlock> :null}
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
  return bindActionCreators({ saveDelivery: saveDelivery, updateDelivery: updateDelivery, unselectDelivery: unselectDelivery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDelivery);
