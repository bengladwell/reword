import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import stateTransformer from './reducers';
import App from './components/App';

import { addWord } from './actions';

const words = ['hello', 'here', 'are', 'some', 'words'];

let store = createStore(stateTransformer),
  i = 0,
  cancelInterval = setInterval(() => {
    store.dispatch(addWord(words[i]));
    i += 1;
    if (i === words.length) {
      clearInterval(cancelInterval);
    }
  }, 300);

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.getElementsByTagName('body')[0]
  );
});
