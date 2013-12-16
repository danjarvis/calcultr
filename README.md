calcultr
========

Small jabber robot that responds to simple commands, executes math operations, and can be easily extended. calcultr is written in Node.


Installation
------------

`$ git clone https://github.com/danjarvis/calcultr.git`

Usage
-----

`$ node server.js <jid> <password> <server> <port>`

or...

`$ nodemon server.js <jid> <password> <server> <port>`

Once the server is running, use a jabber client to being chatting with bot. Start by typing 'help'.

Extend
------

Building upon the supported commands is easy. Write a module and save it in the lib/commands directory. The module must export a single object:

```javascript
{
  name: 'Name of command.',
  description: 'Description of command.',
  handler: function(input, session, commands) {
    // <input>: client jabber message
    // <session>: Session object for the client that sent the message
    // <commands>: current command set

    // handler must return a string (response)
    return "bacon";
  }
}
```

The `name` attribute is not required. If one is not supplied the file name will be used as command name.

License: [MIT](http://danjarvis.mit-license.org)