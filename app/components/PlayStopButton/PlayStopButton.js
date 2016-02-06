import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';

export default class PlayStopButton extends Component {

  constructor() {
    super(...arguments);
    this.playInterval = 4000;
  }

  toggle() {
    this.props.dispatch({type: 'IS_PLAYING_TOGGLE'});
  }

  componentDidMount() {
    if (this.props.isPlaying) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    if (this.props.isPlaying) {
      this.stopAnimation();
    }
  }

  componentDidUpdate() {
    if (this.props.isPlaying && !this.playFuncId) {
      this.startAnimation();
    } else if (!this.props.isPlaying && this.playFuncId) {
      this.stopAnimation();
    }
  }

  startAnimation() {
    this.transitionNextPhrase();
    this.playFuncId = window.setInterval(() => {
      this.transitionNextPhrase();
    }, this.playInterval);
  }

  stopAnimation() {
    if (this.playFuncId) {
      window.clearInterval(this.playFuncId);
      delete this.playFuncId;
    }
  }

  transitionNextPhrase() {
    const {phrases, activePhraseIndex, dispatch} = this.props;

    if (!phrases.length) {
      return false;
    }

    if (activePhraseIndex + 1 < phrases.length) {
      dispatch({
        type: 'INC_ACTIVE_PHRASE'
      });
    } else {
      dispatch({
        type: 'CHANGE_PHRASE',
        index: 0
      });
    }

  }

  render() {
    const { isPlaying } = this.props;

    return (
      <div>
        <FlatButton style={{verticalAlign: 'middle'}} secondary={true} label={isPlaying ? "Stop" : "Play"} labelPosition="after" onClick={this.toggle.bind(this)}>
          <FontIcon style={{verticalAlign: 'middle', left: '4px', top: '-1px'}} className="material-icons">{isPlaying ? "stop" : "play_arrow"}</FontIcon>
        </FlatButton>
      </div>
    );
  }

}

PlayStopButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  phrases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,
  activePhraseIndex: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};
