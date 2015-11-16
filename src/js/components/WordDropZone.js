import React, { Component, PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';

import { moveWord } from '../actions';

import styles from '../../css/components/word-drop-zone.css';

const wordTarget = {
  drop(props, monitor, dropZone) {
    dropZone.context.store.dispatch(moveWord(monitor.getItem().id, props.space, monitor.getItem().index < props.index ? props.index - 1 : props.index));
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class WordDropZone extends Component {
  // TODO - style:width should be gathered from source
  render() {
    const { connectDropTarget, isOver, isLast } = this.props;
    return connectDropTarget(
      <div className={isOver ? styles.hover : (isLast ? styles.isLast : styles.root)}></div>
    );
  }
}

WordDropZone.contextTypes = {
  store: React.PropTypes.object
};

WordDropZone.propTypes = {
  isOver: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  space: PropTypes.string.isRequired,
  isLast: PropTypes.bool
};

export default dropTarget('WORD', wordTarget, collect)(WordDropZone);
