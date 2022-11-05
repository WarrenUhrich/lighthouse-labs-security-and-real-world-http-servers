const cookieSession = require('cookie-session');
const express = require('express');

const app = express();

app.use(cookieSession({
  name: 'session', // This is the cookie key name we see in the browser.
  keys: ['my secret key', 'my second key'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.listen(8080);

app.get('/', (req, res) => {
    req.session.myBrandNewValue = 123; // Setting a session value.
    res.end('Secret session value is: ' + req.session.myBrandNewValue);
});
