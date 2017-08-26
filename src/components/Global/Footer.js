// Dependencies
import React, { Component } from 'react';

// Styles
const styles = {
  footer: {
    margin: 0+'auto',
    textAlign: 'center'
  }
};

export default class Footer extends Component {
  render () {
    return (
      <div style={styles.footer}>
        <p>Delivery App</p>
      </div>
    )
  }
}
