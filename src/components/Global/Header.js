// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// React Bootstrap Components
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { title } = this.props;

    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            {title}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/deliveries">
              <NavItem eventKey={1}>Deliveries</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/info">
            <NavItem eventKey={1}>Info</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
