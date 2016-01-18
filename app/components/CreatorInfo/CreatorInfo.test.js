import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import CreatorInfo from './CreatorInfo';

describe('CreatorInfo', () => {

  describe('componentDidUpdate', () => {

    it('should fetch missing person info', () => {
      let component = renderIntoDocument(
        <CreatorInfo
          phrases={[{
            date: new Date(),
            user: 'test/user',
            words: ['0', '1']
          }]}
          activePhraseIndex={0}
          people={{}}
          dispatch={() => {
            return true;
          }}
        />
      ),
        dataSpy = sinon.spy();

      sinon.stub(component.firebase, 'child').returns({
        once: dataSpy
      });

      component.componentDidUpdate();

      expect(dataSpy.calledWithExactly('value', component.addFirebasePerson)).to.equal(true);
    });

  });

  describe('addFirebasePerson', () => {

    it('should dispatch ADD_PERSON with new data', () => {

      let component = renderIntoDocument(
        <CreatorInfo
          phrases={[{
            date: new Date(),
            user: 'test/user',
            words: ['0', '1']
          }]}
          activePhraseIndex={0}
          people={{}}
          dispatch={sinon.spy()}
        />
      );

      component.addFirebasePerson({
        val: sinon.stub().returns({
          name: 'name',
          image: 'image'
        }),
        key: sinon.stub().returns('key')
      });

      expect(component.props.dispatch.calledWithExactly({
        type: 'ADD_PERSON',
        id: 'key',
        name: 'name',
        image: 'image'
      })).to.equal(true);

    });

    it('should not dispatch ADD_PERSON without new data', () => {

      let component = renderIntoDocument(
        <CreatorInfo
          phrases={[{
            date: new Date(),
            user: 'test/user',
            words: ['0', '1']
          }]}
          activePhraseIndex={0}
          people={{}}
          dispatch={sinon.spy()}
        />
      );

      component.addFirebasePerson({
        val: sinon.stub()
      });

      expect(component.props.dispatch.called).to.equal(false);

    });

  });

});

