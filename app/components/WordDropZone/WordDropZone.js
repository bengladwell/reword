import React, { Component, PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';

import styles from './WordDropZone.css';

const wordTarget = {
  drop(props, monitor, dropZone) {
    dropZone.context.store.dispatch({
      type: 'CREATION_MOVE_WORD',
      space: props.space,
      word: monitor.getItem().id,
      index: monitor.getItem().index < props.index ? props.index - 1 : props.index
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class WordDropZone extends Component {
  render() {
    const { connectDropTarget, isOver, isLast } = this.props;
    return connectDropTarget(
      <div className={isOver ? styles.hover : (isLast ? styles.isLast : styles.root)}></div>
    );
  }
}

WordDropZone.contextTypes = {
  store: PropTypes.object
};

WordDropZone.propTypes = {
  isOver: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  space: PropTypes.string.isRequired,
  isLast: PropTypes.bool
};

export default dropTarget('WORD', wordTarget, collect)(WordDropZone);
