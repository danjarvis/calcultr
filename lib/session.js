/**
 * calcultr :: session module
 *
 * track context and stuffs for a chat session
 */
var vm = require('vm');

var Session = function(jid) {
  console.log('creating new session for %s', jid);
  this.jid = jid;
  this.context = vm.createContext();
}

module.exports = Session;