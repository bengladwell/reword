/*eslint no-unused-expressions:0 dot-notation:0*/
import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {describe, it} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import AnimatedWords from './AnimatedWords';

describe('AnimatedWords', () => {

  describe('componentDidMount()', () => {

    it('should add a resize listener', () => {
      let component = new AnimatedWords({
          words: [],
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: false
        }),
        subject = sinon.spy(window, 'addEventListener');
      sinon.stub(component, 'updatePositions');
      component.componentDidMount();

      expect(subject.calledWith('resize', component.debouncedUpdatePositions)).to.be.true;

      subject.restore();
    });

  });

  describe('componentWillUnmount()', () => {
    it('should remove a resize listener', () => {
      let component = new AnimatedWords({
          words: [],
          phrases: [],
          activePhraseIndex: 0,
          isPlaying: false
        }),
        subject = sinon.spy(window, 'removeEventListener');
      component.componentWillUnmount();

      expect(subject.calledWith('resize', component.debouncedUpdatePositions)).to.be.true;

      subject.restore();
    });
  });

  describe('updatePositions()', () => {

    it('should place phrase on a new row', () => {
      let component = renderIntoDocument(
        <AnimatedWords
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
          phrases={[{
            date: Date.now(),
            user: 'test/user',
            words: ['1']
          }]}
          activePhraseIndex={0}
          isPlaying={true}
        />
      ),
        wordNode = ReactDOM.findDOMNode(component.wordRefs['1']),
        topPx = wordNode.style.top;

      expect(parseInt(topPx.substring(0, topPx.length - 2), 10)).to.equal(component.rowHeight * component.gapRows);
    });

    it('should not overrun its container', () => {
      let component = renderIntoDocument(
        <AnimatedWords
          words={[{
            id: '0',
            text: '0'
          }, {
            id: '1',
            text: '1'
          }, {
            id: '2',
            text: '2'
          }, {
            id: '3',
            text: '3'
          }]}
          phrases={[{
            date: Date.now(),
            user: 'test/user',
            words: ['0']
          }]}
          activePhraseIndex={0}
          isPlaying={true}
        />
      );

      component.refs.words.offsetWidth = 10;
      component.props.words.forEach((w) => {
        ReactDOM.findDOMNode(component.wordRefs[w.id]).offsetWidth = 8;
      });

      component.updatePositions();

      ['1', '2', '3'].forEach((id, i) => {
        const wordNode = ReactDOM.findDOMNode(component.wordRefs[id]),
          topPx = wordNode.style.top;

        expect(parseInt(topPx.substring(0, topPx.length - 2), 10)).to.equal(component.rowHeight * i);
      });
    });

  });

});
