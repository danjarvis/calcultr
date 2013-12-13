/**
 * calcultr :: session module
 *
 * track vars for a chat session
 */
var Session = function(jid) {
  this._jid = jid;
  this._vars = {};
}

Session.prototype.addVar = function(k, v) {
  this._vars[k] = v;
};

Session.prototype.getVar = function(k) {
  return this._vars[k];
};

module.exports = Session;