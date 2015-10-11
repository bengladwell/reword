import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../../css/components/settings.css';

export default class Settings extends Component {
  render() {
    return (
      <div className={styles.root}>
      </div>
    );
  }
}

// TODO - change from any
Settings.propTypes = {
  settings: PropTypes.any.isRequired
};

export default connect(state => {
  return state.settings || {};
})(Settings);
