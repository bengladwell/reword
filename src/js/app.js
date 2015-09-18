import React from 'react';
import AvailableWords from './components/AvailableWords';

var words = [
  {id: 0, text: 'hello'},
  {id: 1, text: 'here'},
  {id: 2, text: 'are'},
  {id: 3, text: 'some'},
  {id: 4, text: 'words'}
];

document.addEventListener('DOMContentLoaded', function () {
  React.render(<AvailableWords words={words} />, document.getElementsByTagName('body')[0]);
});
