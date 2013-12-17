'use strict';

/**
 * calcultr :: server module
 */
var argv = process.argv
  , xmpp = require('simple-xmpp')
  , Session = require('./lib/session')
  , Handler = require('./lib/handler')
  , handler = new Handler('lib/commands')
  , sessions = {};

if (argv.length !== 6) {
  console.error('Usage: node server.js <jid> <pass> <host> <port>');
  process.exit(1);
}

require('setimmediate');
xmpp.on('online', function(from, message) {
  console.log('calcultr is online...');
});

xmpp.on('error', function(err) {
  console.error(err);
});

xmpp.on('chat', function(from, message) {
  var response;
  if ('undefined' === typeof sessions[from])
    sessions[from] = new Session(from);
  
  console.log('%s > %s', from, message);
  setImmediate(function() {
    response = handler.response(message, sessions[from]);
    console.log("response > %s", response);
    xmpp.send(from, response);
  });
});

xmpp.on('disconnect', function(from) {
  console.log("%s :: disconnected", from);
  if ('undefined' !== typeof sessions[from])
    delete sessions[from];
});

xmpp.connect({
  jid: argv[2],
  password: argv[3],
  host: argv[4],
  port: argv[5]
});