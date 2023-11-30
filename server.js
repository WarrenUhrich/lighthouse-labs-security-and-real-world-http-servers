////////////////////////////////////////////////////////////////////////////////////
// Requires / Packages
///////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

////////////////////////////////////////////////////////////////////////////////////
// Variables/Set-Up
///////////////////////////////////////////////////////////////////////////////////
const app = express();
const port = 3000;
const salt = bcrypt.genSaltSync(10);

////////////////////////////////////////////////////////////////////////////////////
// Helpers
///////////////////////////////////////////////////////////////////////////////////

const findUserWithEmail = (email) => {
  for (const userId in users) {
    const user = users[userId];

    if (user.email === email) {
      // we found our user!
      return user;
    }
  }

  return null;
};

////////////////////////////////////////////////////////////////////////////////////
// Database
///////////////////////////////////////////////////////////////////////////////////

const users = {
  abc: {
    id: "abc",
    email: "a@a.com",
    password: bcrypt.hashSync("1234", salt),
  },
  def: {
    id: "def",
    email: "b@b.com",
    password: bcrypt.hashSync("5678", salt),
  },
};

////////////////////////////////////////////////////////////////////////////////////
// Configuration
///////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////////
// Middleware
///////////////////////////////////////////////////////////////////////////////////

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // creates and populates req.body
// app.use(cookieParser()); // creates and populates req.cookies
app.use(cookieSession({ // creates and populates req.session
  name: 'session',
  keys: ['our-session-key'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

////////////////////////////////////////////////////////////////////////////////////
// Routes
///////////////////////////////////////////////////////////////////////////////////

// GET /login
app.get('/login', (req, res) => {
  res.render('login'); // SSR
});

// POST /login
app.post('/login', (req, res) => {
  // pull the data off the body object
  const email = req.body.email;
  const password = req.body.password;

  // did they NOT give us an email or password
  if (!email || !password) {
    return res.status(400).send('please provide an email AND password');
  }

  // lookup the user based on their email
  // let foundUser = null;

  // for (const userId in users) {
  //   const user = users[userId];

  //   if (user.email === email) {
  //     // we found our user!
  //     foundUser = user;
  //   }
  // }

  const foundUser = findUserWithEmail(email);

  // did we NOT find a user
  if (!foundUser) {
    return res.status(400).send('no user with that email found');
  }

  // do the passwords NOT match
  const passwordsMatch = bcrypt.compareSync(password, foundUser.password);
  // if (foundUser.password !== password) {
  if(!passwordsMatch) {
    return res.status(400).send('passwords do not match');
  }

  // happy path! the user is who they say they are!

  // set the cookie
  // res.cookie('userId', foundUser.id);
  req.session.userId = foundUser.id;
  
  // redirect the user somewhere
  res.redirect('/protected');
});

// GET /protected
app.get('/protected', (req, res) => {
  // check for a cookie
  // const userId = req.cookies.userId;
  const userId = req.session.userId;

  // do they NOT have a cookie?
  if (!userId) {
    return res.status(401).send('you must be signed in to see this page');
  }

  // render the protected page
  const user = users[userId];

  const templateVars = {
    email: user.email
  };

  res.render('protected', templateVars);
});

// POST /logout
app.post('/logout', (req, res) => {
  // clear the cookie
  // res.clearCookie('userId');
  // req.session.userId = undefined;
  req.session = null; // Destroys session.

  // send the user somewhere
  res.redirect('/login');
});

// GET /register
app.get('/register', (req,res) => {
  res.render('register');
});

// POST /register
app.post('/register', (req, res) => {
  // pull the data off the body object
  const email = req.body.email;
  const password = req.body.password;

  // did they NOT give us an email or password
  if (!email || !password) {
    return res.status(400).send('please provide an email AND password');
  }

  // check if the provided email address is unique
  // let foundUser = null;

  // for (const userId in users) {
  //   const user = users[userId];

  //   if (user.email === email) {
  //     foundUser = user;
  //   }
  // }

  const foundUser = findUserWithEmail(email);

  // did we find a user
  if (foundUser) {
    return res.status(400).send('a user with that email already exists');
  }

  // the email is unique!! create a new user object
  const id = Math.random().toString(36).substring(2, 5); // creates a random 3-char string

  const user = {
    id: id,
    email: email,
    password: bcrypt.hashSync(password, salt),
  };

  // update the users object
  users[id] = user;

  console.log(users);

  // send the user to the login page
  res.redirect('/login');
});

////////////////////////////////////////////////////////////////////////////////////
// Listener
///////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});