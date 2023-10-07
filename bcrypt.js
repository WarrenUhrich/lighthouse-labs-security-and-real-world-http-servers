const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
console.log('salt:', salt);

// Example) Someone is registering an account for our site.

const password = 'myp4ss';
const hash = bcrypt.hashSync(password, salt);
console.log('hash:', hash);

// Example 2) Someone is trying to sign in using their password.

const enteredPassword = 'myp4ss';
const signedIn = bcrypt.compareSync(enteredPassword, hash);
console.log('signedIn:', signedIn);
