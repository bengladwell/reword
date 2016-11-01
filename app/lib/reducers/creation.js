import update from 'react-addons-update';

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
