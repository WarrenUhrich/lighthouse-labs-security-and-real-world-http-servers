const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const PORT = 3000;
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public')); // Choose a directory to serve files from... (images, CSS, JS, videos.)
app.use(express.urlencoded({extended: true})); // Gather form submission data.
app.use(cookieParser()); // Help with cookies!
app.use(morgan('dev')); // Helpful logging, showing method, path, and status codes.

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Template Engine
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Listener
/////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log('Express server running on port:', PORT);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Database
/////////////////////////////////////////////////////////////////////////////////////////////////////

const users = [
    {id: 1, name: 'Warren', pass: 'Password123'},
    {id: 2, name: 'Duy', pass: 'b3tt3rp4ss'},
];

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Home page (PROTECTED.)
app.get('/', (req, res) => {
    const userID = req.cookies.userID;

    let currentUser = false;

    for (const user of users) {
        if (userID == user.id) {
            currentUser = user;
        }
    }

    if (!currentUser) {
        res.redirect('/sign-in');
    }

    const templateVars = {
        pageName: 'Home [Protected Page 🚫]',
        user: currentUser
    };

    res.render('index', templateVars);
});

// Display the Sign-In form.
app.get('/sign-in', (req, res) => {
    const userID = req.cookies.userID;

    let currentUser = false;

    for (const user of users) {
        if (userID == user.id) {
            currentUser = user;
        }
    }

    const templateVars = {
        pageName: 'Sign In',
        user: currentUser
    };

    res.render('sign-in', templateVars);
});

// Handle Sign In form submission.
app.post('/sign-in', (req, res) => {
    const username = req.body.username;
    const password = req.body.pass;

    let currentUser = false;

    for (const user of users) {
        if (user.name == username && user.pass == password) {
            currentUser = user;
        }
    }

    if (currentUser) {
        res.cookie('userID', currentUser.id);
    }

    console.log('User:', username, 'Password:', password);

    // Send'em home!
    res.redirect('/');
});

// Display the Register form.
app.get('/register', (req, res) => {

    const templateVars = {
        pageName: 'Register',
        user: false
    };

    res.render('register', templateVars);
});

// Handle Register form submission.
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.pass;

    console.log('Username:', username, 'Password:', password);

    const newID = users.length + 1; // Next ID (just add one.)

    // Real world... check if username already exists...
    // Real world... generate more unique ID, etc.

    // Creating and adding the new user.
    users.push({
        id: newID,
        name: username,
        pass: password
    });

    // Sign the user in.
    res.cookie('userID', newID);

    // Send'em home!
    res.redirect('/');
});

// Handle sign-out.
app.post('/sign-out', (req, res) => {
    res.clearCookie('userID'); // Destroy the cookie (by key)!
    res.redirect('/'); // Send'em home!
});
