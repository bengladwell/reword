import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import Firebase from 'firebase';

import { words, user as userReducer } from './reducers';
import Root from './components/Root';
import { addWord, addUser } from './actions';

const reducer = combineReducers({
  router: routerStateReducer,
  words,
  user: userReducer
});

const store = reduxReactRouter({ createHistory })(createStore)(reducer);

const firebase = new Firebase('https://reword.firebaseio.com');

firebase.onAuth((authData) => {
  if (authData) {
    const user = {
      provider: authData.provider,
      name: authData.github.displayName,
      image: authData.github.profileImageURL
    };
    store.dispatch(addUser(user));
    firebase.child('users').child(authData.uid).set(user);
  }
});

firebase.child('words').once('value', (data) => {
  let fwords = data.val();
  for (let id in fwords) {
    store.dispatch(addWord(id, fwords[id].text));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
