// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header title="Delivery" />
        <div className="container">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}
