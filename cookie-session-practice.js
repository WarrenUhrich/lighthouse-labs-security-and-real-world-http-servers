const cookieSession = require('cookie-session');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(cookieSession({
  name: 'practice-session', // The NAME/KEY of the cookie we see in-browser.
  keys: ['abc', 'def', 'ghi'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));

app.get('/set-encrypted-cookie', (req, res) => {
    req.session.message = 'Hello, World!';
    res.status(200).end('<p>Session cookie set!</p>');
});

app.get('/get-encrypted-cookie', (req, res) => {
    res.status(200).end(`<p>req.session.message: ${req.session.message}</p>`);
});

app.get('/clear-session', (req, res) => {
    req.session = null;
    res.status(200).end('<p>Session cleared (logged-out!)</p>');
});
