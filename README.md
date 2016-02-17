# Reword
## An experiment with React, Redux, and more

Demo: https://reword.firebaseapp.com/

This project is an effort to learn React and some emerging JS libraries. These include:  
* [Redux](https://github.com/rackt/redux)  
* [React Router](https://github.com/rackt/react-router)   
* [React DnD](https://github.com/gaearon/react-dnd) for drag and drop  
* [CSS Modules](https://github.com/css-modules/css-modules)

In addition, the app uses  
* [Firebase](https://www.firebase.com/) as a backend, including auth  
* [Material UI](http://www.material-ui.com/#/home) components  
* [gulp](https://github.com/gulpjs/gulp) and [Browserify](https://github.com/substack/node-browserify) to assemble to project  
* [ESLint](http://eslint.org/)  
* ES2015

With the exception of Browserify, gulp, ESLint, and ES2015, all of these technologies are new to me. I'm probably doing lots of stuff wrong, so feedback/PRs are welcomed!

## What is it?
It's a web app that mimics a classic refrigerator magnets game. If you log in, you can create phrases by dragging words around. Phrases are displayed along with their author on the main page.

Check out the latest version at [https://reword.firebaseapp.com/](https://reword.firebaseapp.com/)

## Infrequently Asked Questions

### Where are the action creators and action constants?
I started building this project using the action creator and action constant conventions advocated in the Redux docs. I evenually found that the additional indirection wasn't helpful to me, so I removed them in favor of passing object literals. [Apparently](http://rackt.org/redux/docs/basics/Actions.html#note-on-boilerplate), this is an ok thing to do.

### What about [redux-router](https://github.com/acdlite/redux-router) or [react-router-redux](https://github.com/reactjs/react-router-redux)?
I started out using redux-router to inject router state into the app state. However, I realized that there wasn't a real need for it. I occassionally needed a reference to the current router location, but it was just as easy to use the router reference from context, which is the standard react-router way of doing things. Removing one of the many, many library dependencies was also satisfying.

## What about shrinkwrapping those npm dependencies?
I started out doing that too. But for now, I have found it better to keep up with dependency changes.

## Tests
`npm test`  

Tests use jsdom, mocha, chai, and sinon.

## Set up instructions

###Create a [Firebase](https://www.firebase.com/) app.
* Make note of the app name; you will be plugging that in a bunch of places.  

### Enable GitHub auth for your Firebase app.  
* In [GitHub settings](https://github.com/settings/applications/new), Register a new OAuth application.  
 * You can use a homepage url like: https://\<firebase app name>.firebaseapp.com/.  
 * Use the authorization callback url: https://auth.firebase.com/v2/\<firebase app name>/auth/github/callback  
* After saving the application, GitHub will provide you with a Client ID and Client Secret for the application. In Firebase, go to the app management page for your app, select the Login & Auth area, then the GitHub. Enable GitHub Authentication and plug in the Client ID and Client Secret.  

###Local setup
* Clone this repo.  
* `cd` to the directory and `npm install`.  
* Create `config.json` like  
```json
{
  "firebaseApp": "<A firebase app name>",
  "adminUser": "github:<your github user id>"
}
```
You can find your github user id [here](http://caius.github.io/github_id/). (Thanks @caius)

You should now be able to run the development server:  
`gulp serve`  

The server will listen on localhost:3000. After loading the page, you can click login with GitHub in the upper right. You should be presented with a GitHub Authorize Application screen. After you authorize, you should be able to go to settings and add words.

To build and deploy to Firebase:  
`npm run deploy`
