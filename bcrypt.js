const bcrypt = require('bcryptjs');

// console.log(bcrypt);

const salt = bcrypt.genSaltSync(10);
console.log('salt', salt);

const myPass = 'p4ssw0rd';

const hash = bcrypt.hashSync(myPass, salt);
console.log('hash', hash);

const mySubmittedPass1 = 'abcdef123'; // This doesn't match...
const mySubmittedPass2 = 'p4ssw0rd'; // This is a match!

const result1 = bcrypt.compareSync(mySubmittedPass1, hash);
const result2 = bcrypt.compareSync(mySubmittedPass2, hash);

console.log('Pass one matched?', result1);
console.log('Pass two matched?', result2);
