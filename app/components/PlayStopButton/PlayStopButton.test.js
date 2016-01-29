/*eslint no-unused-expressions:0 dot-notation:0*/
import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import PlayStopButton from './PlayStopButton';

describe('PlayStopButton', () => {

  describe('componentDidMount', () => {

    it('should start the animation on mount if isPlaying is true', () => {
      let component = new PlayStopButton({
          words: [],
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: true,
          dispatch: () => {}
        }),
        subject = sinon.stub(component, 'startAnimation');

      component.componentDidMount();

      expect(subject.calledOnce).to.be.true;
    });

    it('should not start the animation on mount if isPlaying is false', () => {
      let component = new PlayStopButton({
          words: [],
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: false,
          dispatch: () => {}
        }),
        subject = sinon.stub(component, 'startAnimation');

      component.componentDidMount();

      expect(subject.called).to.be.false;
    });

    it('should stop the animation on unmount if isPlaying is true', () => {
      let component = new PlayStopButton({
        words: [],
        phrases: [],
        activePhraseIndex: 0,
        isPlaying: true
      });
      sinon.spy(component, 'stopAnimation');

      component.componentWillUnmount();

      expect(component.stopAnimation.calledOnce).to.be.true;
    });

    it('should not stop the animation on unmount if isPlaying is false', () => {
      let component = new PlayStopButton({
        words: [],
        phrases: [],
        activePhraseIndex: 0,
        isPlaying: false
      });
      sinon.spy(component, 'stopAnimation');

      component.componentWillUnmount();

      expect(component.stopAnimation.called).to.be.false;
    });

  });

  describe('componentDidUpdate', () => {

    it('should call startAnimation if isPlaying is true and no playFuncId', () => {
      let component = new PlayStopButton({
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: true,
          dispatch: () => {}
        }),
        subject = sinon.stub(component, 'startAnimation');
      component.componentDidUpdate();

      expect(subject.callCount).to.equal(1);
    });

    it('should call stopAnimation if not isPlaying and has playFuncId', () => {
      let component = new PlayStopButton({
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: false,
          dispatch: () => {}
        }),
        subject = sinon.stub(component, 'stopAnimation');
      component.playFuncId = 1;
      component.componentDidUpdate();

      expect(subject.callCount).to.equal(1);
    });

    it('should not call startAnimation if isPlaying is true and has playFuncId', () => {
      let component = new PlayStopButton({
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: true,
          dispatch: () => {}
        }),
        subject = sinon.stub(component, 'startAnimation');
      component.playFuncId = 1;
      component.componentDidUpdate();

      expect(subject.callCount).to.equal(0);
    });

  });

  describe('startAnimation', () => {

    it('should create setInterval function with playInterval', () => {
      let component = new PlayStopButton({
        words: [],
        phrases: [],
        activePhraseIndex: 0,
        isPlaying: true
      });
      sinon.spy(window, 'setInterval');
      component.startAnimation();

      expect(window.setInterval.calledWithExactly(sinon.match.func, component.playInterval)).to.be.true;
      expect(component.playFuncId).to.be.an('object');

      window.setInterval.restore();
      window.clearInterval(component.playFuncId);
    });
  });

  describe('stopAnimation', () => {
    it('should revoke setInterval function and delete playFuncId', () => {
      let component = new PlayStopButton({
        words: [],
        phrases: [],
        activePhraseIndex: 0,
        isPlaying: true
      });
      sinon.stub(window, 'clearInterval');
      component.playFuncId = 1;
      component.stopAnimation();

      expect(window.clearInterval.args).to.eql([[1]]);
      expect(component.playFuncId).to.be.undefined;

      window.clearInterval.restore();
    });
  });

  describe('transitionNextPhrase', () => {

    const words = [{
        id: '0',
        text: 'zero'
      }, {
        id: '1',
        text: 'one'
      }, {
        id: '2',
        text: 'two'
      }],
      phrases = [{
        date: Date.now(),
        user: 'test/user',
        words: ['1']
      }, {
        date: Date.now(),
        user: 'test/user',
        words: ['2']
      }];

    it('should not change state if there are no phrases', () => {
      let component = new PlayStopButton({
        words,
        phrases: [],
        activePhraseIndex: 0,
        isPlaying: true,
        dispatch: sinon.spy()
      });
      component.transitionNextPhrase();

      expect(component.props.dispatch.called).to.be.false;
    });

    it('should increment active phrase when not on the last phrase', () => {
      let component = new PlayStopButton({
        words,
        phrases,
        activePhraseIndex: 0,
        isPlaying: true,
        dispatch: sinon.spy()
      });
      component.transitionNextPhrase();

      expect(component.props.dispatch.calledWithExactly({
        type: 'INC_ACTIVE_PHRASE'
      })).to.be.true;
    });

    it('should reset to the first phrase when on the last phrase', () => {
      let component = new PlayStopButton({
        words,
        phrases,
        activePhraseIndex: 1,
        isPlaying: true,
        dispatch: sinon.spy()
      });
      component.transitionNextPhrase();

      expect(component.props.dispatch.getCall(0).args).to.eql([{
      //expect(component.props.dispatch.calledWithExactly({
        type: 'CHANGE_PHRASE',
        index: 0
      }]);
    });

  });

  describe('togglePlay', () => {

    it('should dispatch IS_PLAYING_TOGGLE', () => {
      let subject = new PlayStopButton({
        isPlaying: true,
        dispatch: sinon.spy()
      });
      subject.toggle();

      expect(subject.props.dispatch.calledWithExactly({type: 'IS_PLAYING_TOGGLE'})).to.be.true;
    });

  });

});
