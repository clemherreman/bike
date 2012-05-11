
/**
 * Module dependencies.
 */

var express = require('express')
  , swig = require('swig')
  , routes = require('./routes')
  , http = require('http');

var app = express.createServer();

swig.init({
    root: __dirname + '/views',
    allowErrors: true // allows errors to be thrown and caught by express
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.register('.html', swig);
  app.set('view engine', 'html');
  app.set('view options', { layout: false });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
});

app.get('/', routes.index);

app.listen(3000);

console.log("Express server listening on port 3000");
