/**
 * calcultr :: handler module
 *
 * parse input for each message received
 */
var fs = require('fs')
  , path = require('path')
  , util = require('util');

var Handler = function(dir) {
  this.commands = this.loadCommands(dir) || {};
}

/**
 * loadCommands :: load built in commands from <path>
 *
 * Each file should export an object with two properties:
 * module.exports = {
 *   description: 'description of command',
 *   handler: function(input, session) {
 *   }
 * }
 */
Handler.prototype.loadCommands = function(dir) {
  console.log('loading commands from %s', dir);
  var _cmds = {}
    , _desc = function(_cmd) {
      return typeof(_cmd['description']) !== undefined ? _cmd['description'] : 'no description...';
    };
  fs.readdir(dir, function(err, files) {
    if (null != err) {
      console.log('error loading commands ' + err);
      return;
    }

    files.forEach(function(file) {
      var _name = path.basename(file, '.js');
      if (null != _name && typeof(_cmds[_name]) === 'undefined') {
        _cmds[_name] = require(path.resolve(dir, file));
        console.log('loaded command: %s => %s', _name, _desc(_cmds[_name]));
      }
    });
    return _cmds;
  });
}

Handler.prototype.response = function(input, session) {
  return "todo";
};

module.exports = Handler;