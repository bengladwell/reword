export const MOVE_WORD = 'MOVE_WORD';
export const ADD_WORD = 'ADD_WORD';

export const Spaces = {
  AVAILABLE: 'AVAILABLE',
  PHRASE: 'PHRASE'
};

export function moveWord(word, space, index) {
  // word: id
  // space: <AVAILABLE|PHRASE>
  // index: <n>
  return {
    type: MOVE_WORD,
    word,
    space,
    index
  };
}

export function addWord(id, text) {
  return {
    type: ADD_WORD,
    id,
    text
  };
}
