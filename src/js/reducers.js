import { MOVE_WORD, ADD_WORD, Spaces } from './actions';
import { update } from 'react/addons';

/* state: {
 *  words: {
 *    index: [{ id: backend_id, text: word }, ...],
 *    available: [<id>, ...],
 *    phrase: [<id>, ...]
 *  }
 *  settings: { ... },
 *  router: <from react-router/redux-router>
 * }
 */

export function words(state = {index: [], available: [], phrase: []}, action) {
  switch (action.type) {
  case ADD_WORD:
    return Object.assign({}, state, {
      //index: Object.assign({}, state.index, {[action.id]: action.text}),
      index: state.index.concat({
        id: action.id,
        text: action.text
      }),
      available: state.available.concat(action.id)
    });

  case MOVE_WORD:
    if (action.space === Spaces.AVAILABLE && state.available[action.index] === action.word ||
        action.space === Spaces.PHRASE && state.phrase[action.index] === action.word) {
      return state;
    }

    // could improve performance by not filtering both spaces if word is found in first one

    if (action.space === Spaces.AVAILABLE) {
      return Object.assign({}, state, {
        available: update(state.available.filter(function (id) {
          return id !== action.word;
        }), {$splice: [[action.index, 0, action.word]]}),
        phrase: state.phrase.filter(function (id) {
          return id !== action.word;
        })
      });
    }

    if (action.space === Spaces.PHRASE) {
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
