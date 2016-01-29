export function isPlaying(state = true, action) {
  switch (action.type) {

  case 'IS_PLAYING_TOGGLE':
    return !state;

  default:
    return state;
  }
}
