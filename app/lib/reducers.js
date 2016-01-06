import update from 'react-addons-update';

/* state tree: {
 *  words: [ {id: backend_id, text: word}, ... ],
 *
 *  phrases: [{ user: ..., words: [...]}, ... ],
 *
 *  creation: {
 *    available: [ <id>, ... ],
 *    phrase: [ <id>, ... ]
 *  },
 *
 *  // the index of the currently displayed phrase
 *  activePhraseIndex: <n>
 *
 *  // the logged in user
 *  user: { ... },
 *
 *  // people is an indexed list of users who have created phrases
 *  people: { <id>: { name, image } ... },
 *
 *  router: <from react-router/redux-router>
 * }
 */

export function user(state = null, action) {
  switch (action.type) {

  case 'ADD_USER':
    return action.user;

  default:
    return state;
  }
}

export function people(state = {}, action) {
  switch (action.type) {

  case 'ADD_PERSON':
    return Object.assign({}, state, {
      [action.id]: {
        name: action.name,
        image: action.image
      }
    });

  default:
    return state;
  }
}

export function phrases(state = [], action) {
  switch (action.type) {

  case 'ADD_PHRASE':
    return state.concat({
      user: action.user,
      date: action.date,
      words: action.words
    });

  case 'ADD_PHRASES':
    return state.concat(action.phrases.map((phrase) => {
      return {
        user: phrase.user,
        date: phrase.date,
        words: phrase.words
      };
    }));

  default:
    return state;
  }
}

export function activePhraseIndex(state = 0, action) {
  switch (action.type) {

  case 'INC_ACTIVE_PHRASE':
    return state + 1;

  case 'CHANGE_PHRASE':
    return action.index;

  default:
    return state;
  }
}

export function words(state = [], action) {
  switch (action.type) {

  case 'ADD_WORD':
    return state.concat({
      id: action.id,
      text: action.text
    });

  case 'ADD_WORDS':
    return state.concat(action.words.map((word) => {
      return {
        id: word.id,
        text: word.text
      };
    }));

  default:
    return state;
  }
}

export function creation(state = {available: [], phrase: []}, action) {
  switch (action.type) {

  case 'CREATION_INIT':
    return Object.assign({}, state, {
      available: action.words.map(function (word) {
        return word.id;
      })
    });

  case 'MOVE_WORD':
    if (action.space === 'AVAILABLE' && state.available[action.index] === action.word ||
        action.space === 'PHRASE' && state.phrase[action.index] === action.word) {
      return state;
    }

    // could improve performance by not filtering both spaces if word is found in first one

    if (action.space === 'AVAILABLE') {
      return Object.assign({}, state, {
        available: update(state.available.filter(function (id) {
          return id !== action.word;
        }), {$splice: [[action.index, 0, action.word]]}),
        phrase: state.phrase.filter(function (id) {
          return id !== action.word;
        })
      });
    }

    if (action.space === 'PHRASE') {
      return Object.assign({}, state, {
        available: state.available.filter(function (id) {
          return id !== action.word;
        }),
        phrase: update(state.phrase.filter(function (id) {
          return id !== action.word;
        }), {$splice: [[action.index, 0, action.word]]})
      });
    }

    throw new TypeError('Unknown space for MOVE_WORD action');

  default:
    return state;
  }
}
