// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  saveDelivery,
  updateDelivery,
  unselectDelivery
} from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// React Bootstrap Components
import {
  Modal,
  PageHeader,
  Col,
  Glyphicon,
  InputGroup,
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
  FieldGroup,
  Checkbox,
  Button,
  HelpBlock
} from 'react-bootstrap';

// Schemas
import {
  getDeliverySchema,
  getValidDeliverySchema,
  getInputsRestrictions
} from '../schemas/index';

class FormDelivery extends Component {
  static propTypes = {
    delivery: PropTypes.object.isRequired
  };

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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  componentWillMount() {
    this.setState({ showModal: true });
    // Check if is editing or creating a new one
    if (Object.keys(this.props.delivery).length > 0) {
      this.setFormToEdit(this.props.delivery);
    } else {
      this.setFormToNew();
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ showModal: true, formValid: false });
    // If new props have a delivery is because is editing
    if (Object.keys(newProps.delivery).length > 0) {
      this.setFormToEdit(newProps.delivery);
    } else {
      // if there is no delivery, closes the modal and reset the form
      this.setState({ showModal: false });
      this.setFormToNew();
    }
  }

  setFormToEdit(delivery) {
    let { validSchema } = this.state;
    Object.keys(validSchema).map(fieldName => {
      // if is editing and existing delivery, the validation is set to true
      validSchema[fieldName] = true;
    });
    this.setState({
      isEditing: true,
      formValid: true,
      validSchema: validSchema,
      title: 'Edit Delivery',
      delivery: delivery
    });
  }

  setFormToNew() {
    this.setState({
      isEditing: false,
      title: 'New Delivery',
      delivery: getDeliverySchema()
    });
  }

  closeModal() {
    this.setState({ showModal: false });
    this.props.unselectDelivery(this.props.delivery);
  }

  handleSaveClick() {
    this.setState({ showModal: false });
    if (this.state.checkboxIdem) {
      // if checkbox is checked, copy the contact
      const { delivery } = this.state;
      delivery.cmName = delivery.admName;
      delivery.cmSurname = delivery.admSurname;
      delivery.cmPhone = delivery.admPhone;
      delivery.cmEmail = delivery.admEmail;
      this.setState({ delivery: delivery });
    }
    if (this.state.isEditing) {
      this.props.updateDelivery(this.state.delivery);
    } else {
      this.props.saveDelivery(this.state.delivery);
    }
  }

  handleCheckboxChange() {
    let schema = this.state.validSchema;
    schema.cmName = schema.cmSurname = schema.cmPhone = schema.cmEmail = !this
      .state.checkboxIdem;
    this.setState(
      { validSchema: schema, checkboxIdem: !this.state.checkboxIdem },
      this.validateForm
    );
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    const { delivery } = this.state;
    delivery[name] = value;
    this.setState({ delivery }, () => this.validateField(name, value));
  }

  handleTimeChange(event) {
    const { name, value } = event.target;
    const { delivery } = this.state;
    if (value < 1) {
      // It prevents negative values
      delivery[name] = 1;
    } else if (value > 24) {
      // Its using 24hs format so the value can't be higher than 24
      delivery[name] = 24;
    } else {
      delivery[name] = value;
    }
    this.setState({ delivery }, () => this.validateField(name, value));
  }

  getValidationState(prop, limit) {
    const length = this.state.delivery[prop].length;
    if (!this.state.validSchema[prop] || length > limit) {
      return 'error';
    }
  }

  validateField(fieldName, value) {
    const { inputsRestrictions } = this.state;
    let fieldValidationErrors = this.state.formErrors;
    let validSchema = this.state.validSchema;

    switch (fieldName) {
      case 'startTime':
        validSchema[fieldName] = value.match(/^[\d\s]+$/g);
        break;
      case 'endTime':
        validSchema[fieldName] = value.match(/^[\d\s]+$/g);
        break;
      case 'admEmail':
        validSchema[fieldName] = value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        );
        break;
      case 'cmEmail':
        validSchema[fieldName] = value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        );
        break;
      case 'specialties':
        if (value) {
          validSchema[fieldName] =
            value.length <= inputsRestrictions[fieldName];
        }
        break;
      default:
        if (value) {
          validSchema[fieldName] =
            value.length <= inputsRestrictions[fieldName];
        } else {
          validSchema[fieldName] = false;
        }
        break;
    }
    this.setState(
      { formErrors: fieldValidationErrors, validSchema: validSchema },
      this.validateForm
    );
  }

  validateForm() {
    const { validSchema } = this.state;
    let isValid = true;
    Object.keys(validSchema).map(fieldName => {
      if (!validSchema[fieldName]) {
        isValid = false;
      }
    });
    this.setState({ formValid: isValid });
  }

  render() {
    const { delivery, title, inputsRestrictions, formValid } = this.state;

    return (
      <div>
        <Modal
          bsSize="large"
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup
                controlId="formName"
                validationState={this.getValidationState(
                  'name',
                  inputsRestrictions.name
                )}
              >
                <ControlLabel>
                  Name {this.state.validSchema.name ? '' : '*'}
                </ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={delivery.name}
                  onChange={this.handleInputChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup
                controlId="formPhone"
                validationState={this.getValidationState(
                  'phone',
                  inputsRestrictions.phone
                )}
              >
                <ControlLabel>
                  Teléfono {this.state.validSchema.phone ? '' : '*'}
                </ControlLabel>
                <FormControl
                  name="phone"
                  type="text"
                  value={delivery.phone}
                  onChange={this.handleInputChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup
                controlId="formDescription"
                validationState={this.getValidationState(
                  'description',
                  inputsRestrictions.description
                )}
              >
                <ControlLabel>
                  Description {this.state.validSchema.description ? '' : '*'}
                </ControlLabel>
                <FormControl
                  name="description"
                  componentClass="textarea"
                  value={delivery.description}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>
                  {inputsRestrictions.description -
                    delivery.description.length <
                  0
                    ? 'Limit exceeded.'
                    : `${inputsRestrictions.description -
                        delivery.description.length} characters remain.`}
                </HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup
                controlId="formSpecialties"
                validationState={this.getValidationState(
                  'specialties',
                  inputsRestrictions.specialties
                )}
              >
                <ControlLabel>
                  Specialties {this.state.validSchema.specialties ? '' : '*'}
                </ControlLabel>
                <FormControl
                  name="specialties"
                  componentClass="textarea"
                  value={delivery.specialties}
                  onChange={this.handleInputChange}
                />
                <HelpBlock>
                  {inputsRestrictions.specialties -
                    delivery.specialties.length <
                  0
                    ? 'Limit exceeded.'
                    : `${inputsRestrictions.specialties -
                        delivery.specialties.length} characters remain.`}
                </HelpBlock>
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup
                controlId="formDirection"
                validationState={this.getValidationState(
                  'direction',
                  inputsRestrictions.direction
                )}
              >
                <ControlLabel>
                  Direction {this.state.validSchema.direction ? '' : '*'}
                </ControlLabel>
                <FormControl
                  name="direction"
                  type="text"
                  value={delivery.direction}
                  onChange={this.handleInputChange}
                />
                <FormControl.Feedback />
              </FormGroup>

              <FormGroup
                controlId="formTime"
                validationState={
                  !this.state.validSchema.startTime &&
                  !this.state.validSchema.endTime
                    ? 'error'
                    : null
                }
              >
                <ControlLabel>
                  Open{' '}
                  {this.state.validSchema.startTime &&
                  this.state.validSchema.endTime
                    ? ''
                    : '*'}
                </ControlLabel>
                <FormGroup>
                  <InputGroup style={{ width: 30 + '%' }}>
                    <FormControl
                      name="startTime"
                      type="number"
                      value={delivery.startTime}
                      onChange={this.handleTimeChange}
                    />
                    <FormControl.Feedback />
                    <InputGroup.Addon>
                      <Glyphicon glyph="time" />
                    </InputGroup.Addon>
                    <FormControl
                      name="endTime"
                      type="number"
                      value={delivery.endTime}
                      onChange={this.handleTimeChange}
                    />
                    <InputGroup.Addon>
                      <Glyphicon glyph="time" />
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </FormGroup>

              <Col sm={6}>
                <PageHeader>
                  <small>Administrative contact</small>
                </PageHeader>
                <FormGroup
                  controlId="formAdministrativeName"
                  validationState={this.getValidationState(
                    'admName',
                    inputsRestrictions.admName
                  )}
                >
                  <ControlLabel>
                    Name {this.state.validSchema.admName ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="admName"
                    type="text"
                    value={delivery.admName}
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formAdministrativeSurname"
                  validationState={this.getValidationState(
                    'admSurname',
                    inputsRestrictions.admSurname
                  )}
                >
                  <ControlLabel>
                    Surname {this.state.validSchema.admSurname ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="admSurname"
                    type="text"
                    value={delivery.admSurname}
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formAdministrativePhone"
                  validationState={this.getValidationState(
                    'admPhone',
                    inputsRestrictions.admPhone
                  )}
                >
                  <ControlLabel>
                    Phone {this.state.validSchema.admPhone ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="admPhone"
                    type="text"
                    value={delivery.admPhone}
                    onChange={this.handleInputChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formAdministrativeEmail"
                  validationState={this.getValidationState(
                    'admEmail',
                    inputsRestrictions.admEmail
                  )}
                >
                  <ControlLabel>
                    Email {this.state.validSchema.admEmail ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="admEmail"
                    type="text"
                    value={delivery.admEmail}
                    onChange={this.handleInputChange}
                  />
                  <HelpBlock>
                    {!this.state.validSchema.admEmail
                      ? 'The format entered is incorrect.'
                      : ''}
                  </HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
              </Col>

              <Col sm={6}>
                <PageHeader>
                  <small>Comercial contact</small>
                </PageHeader>
                <FormGroup
                  controlId="formComercialName"
                  validationState={this.getValidationState(
                    'cmName',
                    inputsRestrictions.cmName
                  )}
                >
                  <ControlLabel>
                    Name {this.state.validSchema.cmName ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="cmName"
                    type="text"
                    value={delivery.cmName}
                    onChange={this.handleInputChange}
                    disabled={this.state.checkboxIdem}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formComercialSurname"
                  validationState={this.getValidationState(
                    'cmSurname',
                    inputsRestrictions.cmSurname
                  )}
                >
                  <ControlLabel>
                    Surname {this.state.validSchema.cmSurname ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="cmSurname"
                    type="text"
                    value={delivery.cmSurname}
                    onChange={this.handleInputChange}
                    disabled={this.state.checkboxIdem}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formComercialPhone"
                  validationState={this.getValidationState(
                    'cmPhone',
                    inputsRestrictions.cmPhone
                  )}
                >
                  <ControlLabel>
                    Phone {this.state.validSchema.cmPhone ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="cmPhone"
                    type="text"
                    value={delivery.cmPhone}
                    onChange={this.handleInputChange}
                    disabled={this.state.checkboxIdem}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="formComercialEmail"
                  validationState={this.getValidationState(
                    'cmEmail',
                    inputsRestrictions.cmEmail
                  )}
                >
                  <ControlLabel>
                    Email {this.state.validSchema.cmEmail ? '' : '*'}
                  </ControlLabel>
                  <FormControl
                    name="cmEmail"
                    type="text"
                    value={delivery.cmEmail}
                    onChange={this.handleInputChange}
                    disabled={this.state.checkboxIdem}
                  />
                  <HelpBlock>
                    {!this.state.validSchema.cmEmail
                      ? 'The format entered is incorrect.'
                      : ''}
                  </HelpBlock>
                  <FormControl.Feedback />
                </FormGroup>
                <Checkbox
                  checked={this.checkboxIdem}
                  onChange={this.handleCheckboxChange}
                  readOnly
                >
                  Copy administrative contact
                </Checkbox>
              </Col>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {!formValid ? (
              <HelpBlock>The fields with * are required.</HelpBlock>
            ) : null}
            <Button onClick={this.closeModal}>Close</Button>
            <Button
              bsStyle="success"
              onClick={this.handleSaveClick}
              disabled={!formValid}
            >
              Save
            </Button>
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
  return bindActionCreators(
    {
      saveDelivery: saveDelivery,
      updateDelivery: updateDelivery,
      unselectDelivery: unselectDelivery
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDelivery);
