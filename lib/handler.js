/**
 * calcultr :: handler module
 *
 * parse input for each message received
 */
var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , vm = require('vm');

function _getDescription(o) {
  return typeof o['description'] !== 'undefined' ? o['description'] : 'no description...';
}

function _getName(o, f) {
  return typeof o['name'] !== 'undefined' ? o['name'] : f;
}

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
 *   name: 'command name (file name is used if not specified)',
 *   description: 'description of command',
 *   handler: function(input, session, commands) {
 *     return 'something';
 *   }
 * }
 */
Handler.prototype.loadCommands = function(dir, cb) {
  console.log('loading commands from %s', dir);
  var _cmds = {}

  fs.readdir(dir, function(err, files) {
    if (null != err) {
      console.log('error loading commands ' + err);
      return;
    }

    files.forEach(function(file) {
      var _name = path.basename(file, '.js')
        , _cmdName, _cmdDesc, _module;

      if (null !== _name && 'undefined' === typeof _cmds[_name]) {
        _module = require(path.resolve(dir, file));
        _cmdName = _getName(_module, _name);
        _cmdDesc = _getDescription(_module);
        _cmds[_cmdName] = _module;
        console.log('loaded command: %s => %s', _cmdName, _cmdDesc);
      }
    });
    if ('function' === typeof cb)
      cb(_cmds);
  });
}

Handler.prototype.getCommandHandler = function(key) {
  var _fn;
  if ('undefined' === typeof this.commands[key])
    return null;

  _fn = this.commands[key]['handler'];
  if ('function' !== typeof _fn)
    return null;

  return _fn;
};

Handler.prototype.response = function(input, session) {
  try {
    var _sanny = input.trim().toLowerCase()
      , _cmd = this.getCommandHandler(_sanny)

    // Priority goes to built in commands
    if (_cmd !== null)
      return _cmd(input, session, this.commands);

    // Otherwise, just run it in the VM
    return vm.runInContext(input, session.context);
  } catch (err) {
    return err;
  }
};

module.exports = Handler;