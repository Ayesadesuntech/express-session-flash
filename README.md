# express-session-flash

A simple flash message middleware for Express using express-session.

## Installation

```
npm install express-session-flash
```

## Usage

```js
const express = require('express');
const session = require('express-session');
const flash = require('express-session-flash');

const app = express();

app.use(session({
    secret: 'your secret',
    resave: false,
    saveUninitialized: true
}));

app.use(flash);

app.get('/', (req, res) => {
    req.flash('info', 'Welcome!');
    res.redirect('/show-flash');
});

app.get('/show-flash', (req, res) => {
    const messages = req.flash('info');
    res.json({ messages });
});

```

## Usage in EJS

To display flash messages in your EJS templates, you can pass the messages to the view and render them as follows:

```js
// In your route handler
app.get('/show-flash', (req, res) => {
    res.render('show-flash');
});
```

```ejs
<!-- In your EJS template (show-flash.ejs) -->
<% const messages = getFlash('success'); %>

<% if (messages && messages.length > 0) { %>
    <ul>
        <% messages.forEach(function(message) { %>
            <li><%= message %></li>
        <% }) %>
    </ul>
<% } %>
```

## API

- `req.flash(type, message)` - Set a flash message of a given type.
- `req.flash(type)` - Get and clear all messages of a given type.

## License

MIT 