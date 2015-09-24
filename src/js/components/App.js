import React, { Component } from 'react';
import AvailableWords from './AvailableWords';

const words = [
  {id: 0, text: 'hello'},
  {id: 1, text: 'here'},
  {id: 2, text: 'are'},
  {id: 3, text: 'some'},
  {id: 4, text: 'words'}
];

export default class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">quip</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="">Settings</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">quip</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">Settings</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <AvailableWords words={words} />
          </div>
        </main>
      </div>
    );
  }
}

