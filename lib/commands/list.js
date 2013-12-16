module.exports = {
  description: 'List current variables for this session',
  handler: function(input, session) {
    var _msg = 'List of current variables:\n'
      , _count = 0;
    if ('undefined' !== typeof session.context) {
      for (var key in session.context) {
        _msg += '  ' + key + ': ' + session.context[key] + '\n';
        _count++;
      }
    }

    if (_count < 1)
      return 'No variables in this context.';
    return _msg;
  }
};