'use strict';

/**
 * calcultr :: server module
 */
var xmpp = require('simple-xmpp')
  , Session = require('./lib/session')
  , Handler = require('./lib/handler')
  , argv = process.argv;

if (argv.length !== 6) {
  console.error('Usage: node server.js <jid> <pass> <host> <port>');
  process.exit(1);
}

var handler = new Handler('lib/commands')
  , sessions = {};

xmpp.on('online', function(from, message) {
  console.log('calcultr is online...');
});

xmpp.on('error', function(err) {
  console.error(err);
});

xmpp.on('chat', function(from, message) {
  console.log('%s > %s', from, message);
  if (null == sessions[from])
    sessions[from] = new Session(from);
  xmpp.send(from, handler.response(message, sessions[from]));
});

xmpp.on('disconnect', function(from) {
  console.log("%s :: disconnected", from);
  if (null != sessions[from])
    delete sessions[from];
});

xmpp.connect({
  jid: argv[2],
  password: argv[3],
  host: argv[4],
  port: argv[5]
});