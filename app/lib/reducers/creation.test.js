/*eslint no-unused-expressions:0 dot-notation:0*/
import {describe, it} from 'mocha';
import {expect} from 'chai';

import {creation} from './creation';

describe('creation', () => {

  it('throws a TypeError for unrecognized space', () => {
    expect(() => {
      creation(undefined, {type: 'CREATION_MOVE_WORD', space: 'INNER_SPACE'});
    }).to.throw(TypeError);
  });

});
