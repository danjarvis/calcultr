/**
 * calcultr :: handler module
 *
 * parse input for each message received
 */
var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , vm = require('vm');

function Handler(dir) {
  var me = this;
  this.loadCommands(dir, function(cmds) {
    me.commands = cmds;
  });
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
Handler.prototype.loadCommands = function(dir, cb) {
  console.log('loading commands from %s', dir);
  var _cmds = {}
    , _desc = function(_cmd) {
      return typeof(_cmd['description']) !== 'undefined' ? _cmd['description'] : 'no description...';
    };

  fs.readdir(dir, function(err, files) {
    if (null != err) {
      console.log('error loading commands ' + err);
      return;
    }

    files.forEach(function(file) {
      var _name = path.basename(file, '.js');
      if (null !== _name && 'undefined' === typeof _cmds[_name]) {
        _cmds[_name] = require(path.resolve(dir, file));
        console.log('loaded command: %s => %s', _name, _desc(_cmds[_name]));
      }
    });
    if ('function' === typeof cb)
      cb(_cmds);
  });
}

Handler.prototype.getCommandHandler = function(key) {
  var _fn;
  if ('undefined' === typeof(this.commands[key]))
    return null;

  _fn = this.commands[key]['handler'];
  if ('function' !== typeof _fn)
    return null;

  return _fn;
};

Handler.prototype.response = function(input, session) {
  // Priority goes to built in commands
  var _sanny = input.trim().toLowerCase()
    , _cmd = this.getCommandHandler(_sanny)

  if (_cmd !== null)
    return _cmd(input, session);

  // Otherwise, just run it in the VM
  return vm.runInContext(input, session.context);
};

module.exports = Handler;