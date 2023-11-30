// npm install bcryptjs

const bcrypt = require('bcryptjs');

// Generate a salt...
const salt = bcrypt.genSaltSync(15); // Can do this right away...
console.log('salt:', salt);

// Make sure we have plain text we want to hash...
const plainTextPass = 'Password123!';

// Pass our plain text pass and salt into the hashing algo'!
const hash = bcrypt.hashSync(plainTextPass, salt); // Per password...
console.log('hash:', hash);

const theWrongPass = 'abc123';

// Failure example...
let shouldWeLetThemIn = bcrypt.compareSync(theWrongPass, hash); // Needs to be done in sign-in!
console.log('Is this the right pass?', theWrongPass, shouldWeLetThemIn);

// Success example...
shouldWeLetThemIn = bcrypt.compareSync(plainTextPass, hash);
console.log('Is this the right pass?', plainTextPass, shouldWeLetThemIn);
