'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var config = {
  // Server IP
  ip:       process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

  // Server port
  port:     process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            8080
};

app.set('view engine', 'html');

let staticFolder = app.get('env') === 'development' ? '/.dist' : '/dist';

app.use('/static', express.static(__dirname + staticFolder));

app.get('/*', function(req, res){
  res.sendFile(__dirname + staticFolder + '/index.html');
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
