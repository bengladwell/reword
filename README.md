# Reword
## An experiment with React, Redux, and more

This project is an effort to learn React, as well some emerging React libraries. These include:  
* [Redux](https://github.com/rackt/redux)  
* [React Router](https://github.com/rackt/react-router)  
* [React DnD](https://github.com/gaearon/react-dnd) for drag and drop  
* [CSS Modules](https://github.com/css-modules/css-modules)  

In addition, the app uses  
* [Firebase](https://www.firebase.com/) as a backend  
* [Divshot](https://divshot.com/) to host  
* [Material Design Spec](https://www.google.com/design/spec/material-design/introduction.html).  [Material UI](http://www.material-ui.com/#/home) components were used where applicable for convenience  
* [gulp](https://github.com/gulpjs/gulp) and [Browserify](https://github.com/substack/node-browserify) to assemble to project  
* [ESLint](http://eslint.org/)  
* ES2015

With the exception of Browserify, gulp, ESLint, and ES2015, all of these technologies are new to me. I'm probably doing plenty of stuff wrong, so feedback welcome!

Check out the last version at http://reword.divshot.io.

### Where are the tests!?
I do believe in testing. :) I don't usually write tests when I am doing exploratory coding though. Now that basic functionality is working, tests are the next thing on the list.

To build:  
`gulp`

Dev server:
`gulp serve`

To deploy:  
`divshot push`
