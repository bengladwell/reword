import { MOVE_WORD, ADD_WORD, Spaces } from './actions';
import { update } from 'react/addons';

const initialState = {
  words: [],
  availableWords: [],
  phraseWords: []
};

const stateTransformer = function (state = initialState, action) {
  switch (action.type) {
  case MOVE_WORD:
    if (action.space === Spaces.AVAILABLE && state.availableWords[action.index] === action.word ||
        action.space === Spaces.PHRASE && state.phraseWords[action.index] === action.word) {
      return state;
    }

    // could improve performance by not filtering both spaces if word is found in first one

    if (action.space === Spaces.AVAILABLE) {
      return Object.assign({}, state, {
        availableWords: update(state.availableWords.filter(function (id) {
          return id !== action.word;
        }), {$splice: [[action.index, 0, action.word]]}),
        phraseWords: state.phraseWords.filter(function (id) {
          return id !== action.word;
        })
      });
    }

    if (action.space === Spaces.AVAILABLE) {
      return Object.assign({}, state, {
        availableWords: state.availableWords.filter(function (id) {
          return id !== action.word;
        }),
        phraseWords: update(state.phraseWords.filter(function (id) {
          return id !== action.word;
        }), {$splice: [[action.index, 0, action.word]]})
      });
    }

    throw new TypeError('Unknown space for MOVE_WORD action');

  case ADD_WORD:
    // just use the length of the array of words;
    // as long as there is no REMOVE_WORD action this seems safe
    return Object.assign({}, state, {
      words: state.words.concat({
        id: state.words.length,
        text: action.text
      }),
      availableWords: state.availableWords.concat(state.words.length)
    });

  default:
    return state;
  }
};

export default stateTransformer;
