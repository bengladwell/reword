/*eslint no-unused-expressions:0 dot-notation:0*/
import {describe, it} from 'mocha';
import {expect} from 'chai';

import {isPlaying} from './isPlaying';

describe('isPlaying', () => {

  it('should toggle state for IS_PLAYING_TOGGLE', () => {
    expect(isPlaying(true, {type: 'IS_PLAYING_TOGGLE'})).to.be.false;
    expect(isPlaying(false, {type: 'IS_PLAYING_TOGGLE'})).to.be.true;
    expect(isPlaying(undefined, {type: 'IS_PLAYING_TOGGLE'})).to.be.false;
  });

});
