calcultr
========

Small jabber robot that responds to simple commands, executes math operations, and can be easily extended. calcultr is written in Node.

Installation
------------

`$ git clone https://github.com/danjarvis/calcultr.git`

Usage
-----

`$ node server.js <jid> <password> <server> <port>`

Or...

`$ nodemon server.js <jid> <password> <server> <port>`

Extend
------

Building upon the supported commands is easy. Write a module and save it in the lib/commands directory. The module must export a single object:

```javascript
{
  name: 'Name of command.'
  description: 'Description of command.',
  handler: function(input, session) {
    // <input> is the jabber message
    // session is the <lib/session> object for the jid that sent the message
    // handler must return a string
  }
}
```

The <name> attribute is not required. If one is not supplied the file name will be used to associate the handler with a name.

License: [MIT](http://danjarvis.mit-license.org)