/**
 * calcultr :: handler module
 *
 * parse input for each message received
 */

var Handler = function(path) {
  this.defaultHandlers = this.loadHandlers(path);
}

Handler.prototype.loadHandlers = function(path) {
  return {}
}

Handler.prototype.response = function(input, session) {
  return "todo";
};

module.exports = Handler;