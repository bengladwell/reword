import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import CreatePhrase from './CreatePhrase';

describe('CreatePhrase', () => {

  describe('init()', () => {

    it('should dispatch CREATION_INIT when first starting to create a new phrase', () => {
      let component = renderIntoDocument(
        <CreatePhrase
          words={[{
            id: '0',
            text: 'zero'
          }, {
            id: '1',
            text: 'one'
          }, {
            id: '2',
            text: 'two'
          }]}
          creation={{
            available: [],
            phrase: []
          }}
          dispatch={sinon.spy()}
        />
      );

      expect(component.props.dispatch.calledWithExactly({type: 'CREATION_INIT', words: component.props.words})).to.equal(true);
    });

    it('should not dispatch CREATION_INIT when new phrase already started', () => {
      let component = renderIntoDocument(
        <CreatePhrase
          words={[{
            id: '0',
            text: 'zero'
          }, {
            id: '1',
            text: 'one'
          }, {
            id: '2',
            text: 'two'
          }]}
          creation={{
            available: ['0', '1', '2'],
            phrase: ['1']
          }}
          dispatch={sinon.spy()}
        />
      );

      expect(component.props.dispatch.called).to.equal(false);
    });

  });

});
