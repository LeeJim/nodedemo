var express = require('express'),
    app = express(),
    path = require('path'),
    server = require('./config/server'),
    bodyParser = require('body-parser')

app.set('views', './app/views/')
app.set('view engine', 'pug')

app.use(bodyParser.json()); // 请求内容支持json
app.use(bodyParser.urlencoded({ extended: false }));


if ('development' === app.get('env')) {
  app.set('showStackError', true)
  // app.use(express.logger(':method :url :status'))
  app.locals.pretty = true
}

require('./config/routes')(app)

// app.locals.moment = require('moment')

app.listen(server.port, function(){
  console.log(`*********port:${server.port}*********`);
});

app.use(express.static(path.join(__dirname, 'public')))