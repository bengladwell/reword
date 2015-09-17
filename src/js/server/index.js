var express = require('express'),
  // express 4.x packages serve-static as an independent package
  serveStatic = require('serve-static'),
  app = express();

// serve static assets like js and css files from the public directory
app.use(serveStatic(__dirname + '/../../../build/public', {
  index: false
}));

// if $NODE_ENV=development, inject the live-reload js snippet tag
if (process.env.NODE_ENV === 'development') {
  app.use(require('connect-livereload')());
}

// we only have one server-side route; always serve up the build/public/index.html
app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/../../../build/public'
  });
});

app.listen(3000, 'localhost', function () {
  console.log('Listening at http://localhost:3000');
});
