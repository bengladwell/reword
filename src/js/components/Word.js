import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import Transitions from 'material-ui/lib/styles/transitions';

import styles from '../../css/components/word.css';

export default class Word extends Component {
  render() {
    const { text, draggable } = this.props;
    // TODO: return div that encapsulates Paper; styles.root should be on top level div representing this component
    return (
      <Paper zDepth={2} className={draggable ? styles.draggable : styles.root} style={{transition: Transitions.easeOut('1500ms')}}>
        <span className={styles.text}>{text}</span>
      </Paper>
    );
  }
}

Word.propTypes = {
  text: PropTypes.string.isRequired,
  draggable: PropTypes.bool
};
