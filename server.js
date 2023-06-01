const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

////////////////////////////////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////////////////////////////////

const app = express();
const port = 8001;

////////////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // creates/populates req.body
app.use(cookieParser()); // create/populate req.cookies

////////////////////////////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////////////////////////////

const users = {
  abc: {
    id: "abc",
    username: "alice",
    password: "$2a$10$Yrgaf4nAz27EXPvikzBUW.bve2xH9KAidgHDfgtlDNEN44IamaRTG", // 123
  },
  def: {
    id: "def",
    username: "bob",
    password: "$2a$10$ggJxUMZVhZSzM4tC5rwbTOldPf4k/gjBvGFKPRciPsKU60e9/tZUC", // 456
  },
};

////////////////////////////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////////////////////////////

/**
 * Login Routes
 */

// DISPLAY of the login form
app.get('/login', (req, res) => {
  res.render('login');
});

// SUBMISSION of the login form
app.post('/login', (req, res) => {
  // grab the info from the body
  const username = req.body.username;
  const password = req.body.password;

  // did we NOT get a username and/or a password
  if (!username || !password) {
    return res.status(400).send('you must provide a username and password');
  }

  // lookup the user from our "database"
  let foundUser = null;

  for (const userId in users) {
    const user = users[userId];
    if (user.username === username) {
      // we found our user!!!
      foundUser = user;
    }
  }

  // did we NOT find a user
  if (!foundUser) {
    return res.status(400).send('no user with that username found');
  }

  // are the passwords NOT the same?
  // if (foundUser.password !== password) {
  if(!bcrypt.compareSync(password, foundUser.password)) {
    return res.status(400).send('the passwords do not match');
  }

  // HAPPY PATH!!! 🎉
  // set a cookie
  res.cookie('userId', foundUser.id); // async
  
  res.redirect('/protected');
});

/**
 * Protected Page
 */

// protected endpoint
app.get('/protected', (req, res) => {
  // grab the userId from the cookie
  const userId = req.cookies.userId;

  // do they NOT have a cookie?
  if (!userId) {
    return res.status(401).send('you must have a cookie to see this page');
  }

  // happy path
  // lookup the user based off their userId
  const user = users[userId];

  const templateVars = {
    user: user
  };

  res.render('protected', templateVars);
});

/**
 * Logout
 */

// logout
app.post('/logout', (req, res) => {
  // clear the user's cookie
  res.clearCookie('userId');

  // redirect them somewhere
  res.redirect('/login');
});

/**
 * Registration
 */

// DISPLAY of register form
app.get('/register', (req, res) => {
  res.render('register');
});

// SUBMISSION of register form
app.post('/register', (req, res) => {
  // grab the info from the body
  const username = req.body.username;
  const password = req.body.password;

  // did they NOT provide a username and/or password
  if (!username || !password) {
    return res.status(400).send('please provide a username and password');
  }

  // lookup the user from our "database"
  let foundUser = null;

  for (const userId in users) {
    const user = users[userId];
    if (user.username === username) {
      // we found our user!!!
      foundUser = user;
    }
  }

  // did we find a user
  if (foundUser) {
    return res.status(400).send('a user with that username already exists');
  }

  // the username is unique!
  // create a new user object
  const id = Math.random().toString(36).substring(2, 5); // 3 characters
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = {
    id: id,
    username: username,
    password: hash, // Store the HASHED password!
    // password: password
  };

  // update the users database
  users[id] = newUser;
  console.log('users AFTER REGISTRATION:', users);

  // res.cookie('userId', id);
  // res.redirect('/protected');

  res.redirect('/login');
});

////////////////////////////////////////////////////////////////////////////////////////
// Listener (Initiate Server)
////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
