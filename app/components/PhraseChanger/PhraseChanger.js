import React, { Component, PropTypes } from 'react';
import Slider from 'material-ui/lib/slider';

import styles from '../../css/components/phrase-changer.css';

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
              max={phrases.length - 1}
              step={1}
              value={activePhraseIndex}
              description="Slide to see more phrases"
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
