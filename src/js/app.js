import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import stateTransformer from './reducers';
import App from './components/App';
import Firebase from 'firebase';

import { addWord } from './actions';

let store = createStore(stateTransformer),
  fireWords = new Firebase('https://reword.firebaseio.com').child('words');

fireWords.once('value', function (data) {
  let words = data.val();
  for (let id in words) {
    store.dispatch(addWord(id, words[id].text));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <Provider store={store}>
      {() => <App />}
    </Provider>,
    document.getElementsByTagName('body')[0]
  );
});
