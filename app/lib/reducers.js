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
 * }
 */

export function user(state = null, action) {
  switch (action.type) {

  case 'USER_ADD':
    return action.user;

  default:
    return state;
  }
}

export function people(state = {}, action) {
  switch (action.type) {

  case 'PERSON_ADD':
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

export function activePhraseIndex(state = 0, action) {
  switch (action.type) {

  case 'ACTIVE_PHRASE_INC':
    return state + 1;

  case 'ACTIVE_PHRASE_CHANGE':
    return action.index;

  default:
    return state;
  }
}

export function words(state = [], action) {
  switch (action.type) {

  case 'WORD_ADD':
    return state.concat({
      id: action.id,
      text: action.text
    });

  case 'WORD_ADD_MULTIPLE':
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

  case 'CREATION_MOVE_WORD':
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

    throw new TypeError('Unknown space for CREATION_MOVE_WORD action');

  default:
    return state;
  }
}
