/*eslint no-unused-expressions:0 dot-notation:0*/
import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import Settings from './Settings';

describe('Settings', () => {

  describe('deletePhrase', () => {

    it('should call firebase.remove(), then dispatch PHRASE_REMOVE', () => {
      let component = new Settings({
        user: 'test/user',
        phrases: [{
          date: Date.now(),
          user: 'test/user',
          words: ['0', '1']
        }],
        dispatch: sinon.spy(),
        history: {}
      });

      sinon.stub(component.firebase, 'child').returns(component.firebase);
      sinon.stub(component.firebase, 'remove').callsArg(0);

      component.deletePhrase('0011');

      expect(component.firebase.remove.callCount).to.equal(1);
      expect(component.props.dispatch.args).to.eql([[{type: 'PHRASE_REMOVE', id: '0011'}]]);
    });

  });

});
