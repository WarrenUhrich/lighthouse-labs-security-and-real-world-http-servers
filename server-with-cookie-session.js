const express = require('express');
const cookieSession = require('cookie-session');

const app = express();
const PORT = 8080;

app.use(cookieSession({
    name: 'my-first-session', // This name DOES show in the browser!
    keys: ['abc', '123', 'look at me'],

    // Cookie Options
    maxAge: 2 * 7 * 24 * 60 * 60 * 1000 // 2 weeks
}));

app.listen(PORT, () => console.log(
    `server-with-cookie-session.js Express app is listening on port: ${PORT}`
));

app.get('/hello', (req, res) => { // http://localhost:8080/hello
    res.status(200).send('<h1>Hello, World!</h1>');
});

app.get('/create-session', (req, res) => { // http://localhost:8080/create-session
    req.session.schoolName = 'Lighthouse Labs';
    req.session.instructorName = 'Warren Uhrich';
    req.session.lectureName = 'Security and Real World HTTP Servers';
    // res.cookie('schoolName', 'Lighthouse Labs');
    res.status(200).send('<h1>Session created!</h1>');
});

app.get('/read-session', (req, res) => { // http://localhost:8080/read-session
    res.status(200).send(`
        <h1>
            At ${req.session.schoolName /* req.cookies.schoolName */}, today,
            ${req.session.instructorName} is teaching:
            ${req.session.lectureName}
        </h1>
    `);
});

app.get('/destroy-session', (req, res) => { // http://localhost:8080/destroy-session
    req.session = null;
    res.status(200).send('<h1>Session Destroyed!</h1>');
});
