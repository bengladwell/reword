import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';

import Word from '../Word/Word';

import styles from './DraggableWord.css';

const wordSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableWord extends Component {
  render() {
    const { connectDragSource, isDragging, text } = this.props;
    return connectDragSource(
      <div className={styles.root}>{isDragging ? null : <Word text={text} draggable={true} />}</div>
    );
  }
}

DraggableWord.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
};

export default dragSource('WORD', wordSource, collect)(DraggableWord);
