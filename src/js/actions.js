export const MOVE_WORD = 'MOVE_WORD';
export const ADD_WORD = 'ADD_WORD';
export const ADD_WORDS = 'ADD_WORDS';
export const ADD_USER = 'ADD_USER';
export const ADD_PHRASE = 'ADD_PHRASE';

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

export function addWords(words) {
  return {
    type: ADD_WORDS,
    words
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}

export function addPhrase(userId, words) {
  return {
    type: ADD_PHRASE,
    user: userId,
    date: Date.now(),
    words
  };
}
