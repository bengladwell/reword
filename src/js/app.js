import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import Firebase from 'firebase';

import { words } from './reducers';
import Root from './components/Root';
import { addWord } from './actions';

const reducer = combineReducers({
  router: routerStateReducer,
  words
});

const store = reduxReactRouter({ createHistory })(createStore)(reducer);

const fireWords = new Firebase('https://reword.firebaseio.com').child('words');

fireWords.once('value', (data) => {
  let fwords = data.val();
  for (let id in fwords) {
    store.dispatch(addWord(id, fwords[id].text));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
