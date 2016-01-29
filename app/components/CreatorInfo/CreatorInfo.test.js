import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import CreatorInfo from './CreatorInfo';

describe('CreatorInfo', () => {

  describe('componentDidUpdate', () => {

    it('should fetch missing person info', () => {
      let component = new CreatorInfo({
          phrases: [{
            date: Date.now(),
            user: 'test/user',
            words: ['0', '1']
          }],
          activePhraseIndex: 0,
          people: {},
          dispatch: () => {}
        }),
        dataSpy = sinon.spy();

      sinon.stub(component.firebase, 'child').returns({
        once: dataSpy
      });

      component.componentDidUpdate();

      expect(dataSpy.args[0][0]).to.eql('value');
      expect(dataSpy.args[0][1]).to.be.a('function');
    });

  });

  describe('addFirebasePerson', () => {

    it('should dispatch ADD_PERSON with new data', () => {

      let component = new CreatorInfo({
        phrases: [{
          date: Date.now(),
          user: 'test/user',
          words: ['0', '1']
        }],
        activePhraseIndex: 0,
        people: {},
        dispatch: sinon.spy()
      });

      component.addFirebasePerson({
        val: sinon.stub().returns({
          name: 'name',
          image: 'image'
        }),
        key: sinon.stub().returns('key')
      });

      expect(component.props.dispatch.args).to.eql([[{
        type: 'ADD_PERSON',
        id: 'key',
        name: 'name',
        image: 'image'
      }]]);

    });

    it('should not dispatch ADD_PERSON without new data', () => {

      let component = new CreatorInfo({
        phrases: [{
          date: Date.now(),
          user: 'test/user',
          words: ['0', '1']
        }],
        activePhraseIndex: 0,
        people: {},
        dispatch: sinon.spy()
      });

      component.addFirebasePerson({
        val: sinon.stub()
      });

      expect(component.props.dispatch.called).to.equal(false);

    });

  });

});

