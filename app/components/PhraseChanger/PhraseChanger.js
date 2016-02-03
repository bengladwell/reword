import React, { Component, PropTypes } from 'react';
import Slider from 'material-ui/lib/slider';

import styles from './PhraseChanger.css';

export default class PhraseChanger extends Component {

  render() {
    const {
        phrases,
        activePhraseIndex,
        dispatch
      } = this.props;

    return (
      <div>
        {
          phrases.length ?
            <Slider
              className={styles.slider}
              name="phrase"
              style={{marginTop: 0, marginBottom: 12}}
              max={phrases.length - 1}
              step={1}
              value={activePhraseIndex}
              onChange={(e, v) => {
                dispatch({
                  type: 'CHANGE_PHRASE',
                  index: v
                });
              }}
            />
          : null
        }
      </div>
    );
  }

}

PhraseChanger.propTypes = {

  phrases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  activePhraseIndex: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired

};
