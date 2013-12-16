module.exports = {
  description: 'Delete all variables for this session',
  handler: function(input, session) {
    var _msg = 'Deleted variables: ';
    if ('undefined' !== typeof session.context) {
      var keys = Object.keys(session.context);
      if (keys.length < 1)
        return 'No variables in this context.';

      keys.forEach(function(k) {
        _msg += k + ', ';
        delete session.context[k];
      });
    }

    return _msg.replace(/, $/, '');
  }
};