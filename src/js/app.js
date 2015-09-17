import React from 'react';
import AvailableWords from './components/AvailableWords';

document.addEventListener('DOMContentLoaded', function () {
  React.render(<AvailableWords />, document.getElementsByTagName('body')[0]);
});
