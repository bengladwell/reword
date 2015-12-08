import _map from 'lodash.map';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import Firebase from 'firebase';

import { words, user as userReducer, phrases, activePhrase, people } from './reducers';
import Root from './components/Root';

const reducer = combineReducers({
  router: routerStateReducer,
  words,
  user: userReducer,
  phrases,
  activePhrase,
  people
});

const store = reduxReactRouter({ createHistory })(createStore)(reducer);

const firebase = new Firebase('https://reword.firebaseio.com');

firebase.onAuth((authData) => {
  if (authData) {
    const user = {
      id: authData.uid,
      provider: authData.provider,
      name: authData.github.displayName,
      image: authData.github.profileImageURL
    };
    store.dispatch({
      type: 'ADD_USER',
      user: user
    });
    firebase.child('users').child(authData.uid).set(user);
  }
});

firebase.child('phrases').once('value', (data) => {
  store.dispatch({
    type: 'ADD_PHRASES',
    phrases: _map(data.val(), (p) => {
      return p;
    })
  });
});

firebase.child('words').once('value', (data) => {
  let fwords = data.val();
  store.dispatch({
    type: 'ADD_WORDS',
    words: _map(fwords, (w, id) => {
      return {
        id: id,
        text: w.text
      };
    })
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
});
