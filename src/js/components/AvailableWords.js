import React, { Component } from 'react';

export default class AvailableWords extends Component {
  render() {
    var words = this.props.words || [];

    return (
      <div>
        <h1>Available Words</h1>
        <ul>
          {words.map(function (word) {
            return <li key={word.id}>{word.text}</li>;
          })}
        </ul>
      </div>
    );
  }
}
