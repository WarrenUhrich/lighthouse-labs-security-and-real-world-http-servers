// npm install cookie-session

const cookieSession = require('cookie-session');
const express = require('express');

const app = express();
const PORT = 8080;

app.use(cookieSession({
    name: 'my-first-session',
    keys: ['123', 'abc', 'mykey'],
  
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.listen(PORT, () => console.log(
    `Cookie Session example available at: http://localhost:${PORT}`
));

// How do we set a value in our session cookie?
app.get('/set-value', (req, res) => {
    req.session.ourValue = 'Hello, World!';

    res.end(`<p>req.session.ourValue: ${req.session.ourValue}</p>`);
});

// How do we read a value in our session cookie?
app.get('/get-value', (req, res) => {
    console.log('req.session', req.session);
    res.end(`<p>req.session.ourValue: ${req.session.ourValue}</p>`);
});

// How do we clear/delete a value in our session cookie?
app.get('/remove-value', (req, res) => {
    req.session = null; // Removes ALL session values.
    res.end(`<p>Session is now empty.</p>`);
});