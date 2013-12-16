module.exports = {
  description: 'Responds with calultr usage instructions',
  handler: function(input, session, commands) {
    var _msg = 'calcultr :: usage\n\n';
    if ('undefined' !== typeof commands) {
      _msg += 'Supported Commands:\n'
      for (var key in commands)
        _msg += '  ' + key + ': ' + commands[key]['description'] + '\n';
    }

    _msg += '\nMath:\n';
    _msg += '  Addition: 2 + 2 --> 4\n';
    _msg += '  Subtraction: 7 - 2 --> 5\n';
    _msg += '  Division: 100 / 4 --> 25\n';
    _msg += '  Multiplication: 13 * 2 --> 26\n';
    _msg += '  Set Variable: x = 100 --> 100\n';
    _msg += '  Replay Variable: x --> 100\n';
    _msg += '  Other: ...any JS math operation (or code)\n';
    return _msg;
  }
};