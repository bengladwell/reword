import React, { Component } from 'react';
import WordGroup from './WordGroup';
import Sortable from 'sortablejs';

import styles from '../../css/components/available-words.css';

export default class AvailableWords extends Component {
  render() {
    var words = this.props.words || [];

    return (
      <div className={styles.top}>
        <WordGroup words={words} ref="available"/>
      </div>
    );
  }

  componentDidMount() {
    this.sortable = new Sortable(React.findDOMNode(this.refs.available), {
      animation: 300
    });
  }

  componentWillUnmount() {
    this.sortable.destroy();
    this.sortable = null;
  }
}
