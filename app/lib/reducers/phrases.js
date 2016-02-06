export function phrases(state = [], action) {
  switch (action.type) {

  case 'PHRASE_ADD':
    return state.concat({
      id: action.id,
      user: action.user,
      date: action.date,
      words: action.words
    });

  case 'PHRASE_ADD_MULTIPLE':
    return state.concat(action.phrases.map((phrase) => {
      return {
        id: phrase.id,
        user: phrase.user,
        date: phrase.date,
        words: phrase.words
      };
    }));

  case 'PHRASE_REMOVE':
    return state.filter((phrase) => {
      return phrase.id !== action.id;
    });

  default:
    return state;
  }
}
