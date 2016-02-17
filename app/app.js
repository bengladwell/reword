import _map from 'lodash.map';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Firebase from 'firebase';

import config from '../config';
import { words, creation, user as userReducer, activePhraseIndex, people } from './lib/reducers';
import { isPlaying } from './lib/reducers/isPlaying';
import { phrases } from './lib/reducers/phrases';
import Routes from './lib/Routes';

const reducer = combineReducers({
  words,
  creation,
  user: userReducer,
  phrases,
  activePhraseIndex,
  people,
  isPlaying
});

const store = createStore(reducer);

const firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);

// try to get the logged in user from firebase, add to store
firebase.onAuth((authData) => {
  if (authData) {
    const user = {
      id: authData.uid,
      provider: authData.provider,
      name: authData.github.displayName,
      image: authData.github.profileImageURL
    };
    store.dispatch({
      type: 'USER_ADD',
      user: user
    });
    firebase.child('users').child(authData.uid).set(user);
  }
});

// load phrases from firebase
firebase.child('phrases').once('value', (data) => {
  store.dispatch({
    type: 'PHRASE_ADD_MULTIPLE',
    phrases: _map(data.val(), (p, id) => {
      return Object.assign({}, p, {id});
    })
  });
});

// load words from firebase
firebase.child('words').once('value', (data) => {
  const fwords = data.val();
  store.dispatch({
    type: 'WORD_ADD_MULTIPLE',
    words: _map(fwords, (w, id) => {
      return {
        id,
        text: w.text
      };
    })
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Provider store={store}><Routes/></Provider>, document.getElementById('root'));
});
