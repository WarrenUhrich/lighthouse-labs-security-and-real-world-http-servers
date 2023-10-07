// npm install express cookie-parser morgan ejs nodemon

//////////////////////////////////////////////////////////////////////////////
// Requires
//////////////////////////////////////////////////////////////////////////////

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

//////////////////////////////////////////////////////////////////////////////
// Set-Up
//////////////////////////////////////////////////////////////////////////////

const PORT = 8080;
const app = express();

//////////////////////////////////////////////////////////////////////////////
// View / Template Engine
//////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

//////////////////////////////////////////////////////////////////////////////
// Middleware
//////////////////////////////////////////////////////////////////////////////

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

//////////////////////////////////////////////////////////////////////////////
// "Database"
//////////////////////////////////////////////////////////////////////////////

const users = {
    alice: {
        username: 'alice',
        password: 'password123'
    },
    sam: {
        username: 'sam',
        password: 'abc123'
    }
};

//////////////////////////////////////////////////////////////////////////////
// Listener / Server Init
//////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log('Express app listening on port:', PORT);
});

//////////////////////////////////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////////////////////////////////

app.get('/set-example-cookie', (req, res) => {
    res.cookie('myFirstCookie', 'My example value!'); // Tell the browser to set a cookie key-value pair
    res.status(200).end('<p>Example cookie should be set!</p>');
});

app.get('/read-example-cookie', (req, res) => {
    const myCookieVal = req.cookies.myFirstCookie; // Read from a browser request the current key-value pair
    res.status(200).end(
        `<p>myFirstCookie = ${myCookieVal}</p>`
    );
});


/**
 * Sign-In Form
 */

// SHOWS the sign-in form
app.get('/sign-in', (req, res) => {
    res.render('sign-in');
});

// when the sign-in form is SUBMITTED
app.post('/sign-in', (req, res) => {
    // console.log('POST SIGN-IN: req.body', req.body);
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        return res.status(400).end('<p>Missing username or password.</p>');
    }

    const user = users[username];

    if(!user) {
        return res.status(400).end('<p>No user matching that username was found.</p>');
    }

    if(user.password !== password) {
        return res.status(400).end('<p>Incorrect password.</p>');
    }

    res.cookie('username', username);

    // res.status(200).end('<p>Success!</p>');
    res.redirect('/protected');
});

/**
 * Protected Page (Sign-In is Required)
 */

app.get('/protected', (req, res) => {
    const username = req.cookies.username;
    const user = users[username];

    if(!user) {
        return res.status(401).end('<p>You are not signed in.</p>');
    }

    const templateVars = {
        username: username
    };
    res.render('protected', templateVars);
});

/**
 * Register Form
 */

// SHOW register form
app.get('/register', (req, res) => {
    res.render('register');
});

// handle register form SUBMISSION
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        res.status(400).end('<p>Both username and password must be included in submission.</p>');
    }

    const user = users[username];

    if(user) {
        res.status(400).end('<p>A user with this name already exists.</p>');
    }

    // Create new user object (make sure to match users format from above)
    const newUser = {
        username: username,
        password: password
    };

    // sam: {
    //     username: 'sam',
    //     password: 'abc123'
    // }

    users[username] = newUser; // Save new user to "database" variable
    console.log('POST REGISTER: users:', users);

    // res.redirect('/sign-in');

    res.cookie('username', username);
    res.redirect('/protected');
});

/**
 * Sign Out
 */

app.post('/sign-out', (req, res) => {
    res.clearCookie('username'); // Asking the browser to delete this key-value pair
    res.redirect('/sign-in');
});