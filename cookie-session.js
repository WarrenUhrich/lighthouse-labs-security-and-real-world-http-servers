const express = require('express');
const cookieSession = require('cookie-session');

const app = express();
const PORT = 8080;

// Config..
const sessionConfig = {
    name: 'session_id',
    keys: ['sample_session_key'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
};

// Middleware..
app.use(cookieSession(sessionConfig));

// Route..
app.get('/', (req, res) => {
    console.log('req.session before:', req.session);
    
    req.session.exampleSessionValue = 'Hello, World!';
    req.session.myName = 'Warren';
    req.session.views = req.session.views ? req.session.views + 1 : 1;
    
    console.log('req.session after:', req.session);
    
    res.end(`Page viewed ${req.session.views} times by you!`);
});

// Destroy session route..
app.get('/destroy-session', (req, res) => {
    req.session = null; // Delete current session
    res.redirect('/');
});

// Listen..
app.listen(PORT, () => console.log('Listening on:', PORT));
