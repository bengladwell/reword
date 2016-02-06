/*eslint no-unused-expressions:0 dot-notation:0*/
import {describe, it} from 'mocha';
import {expect} from 'chai';

import {phrases} from './phrases';

describe('phrases', () => {

  it('should remove phrase for PHRASE_REMOVE', () => {
    expect(phrases([{
      id: 0,
      user: 'test',
      words: ['a', 'b']
    }, {
      id: 1,
      user: 'test',
      words: ['c', 'd']
    }, {
      id: 2,
      user: 'test',
      words: ['e', 'f']
    }], {
      type: 'PHRASE_REMOVE',
      id: 1
    })).to.eql([{
      id: 0,
      user: 'test',
      words: ['a', 'b']
    }, {
      id: 2,
      user: 'test',
      words: ['e', 'f']
    }]);
  });

});

