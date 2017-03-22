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


if (app.get('env') === 'development') {
	console.log('dev');
	app.use(express.static(__dirname + '/.dist'));
} else {
	app.use(express.static(__dirname + '/dist'));
}

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
