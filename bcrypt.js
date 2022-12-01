const bcrypt = require('bcryptjs');
// console.log(bcrypt);

// Plain text password:
const password = 'myP4ss';

// Random string to make our hash harder to crack!
const salt = bcrypt.genSaltSync(10);
console.log('salt:', salt);

const hash = bcrypt.hashSync(password, salt);
console.log('hash:', hash);

console.log('Is entered password correct?');
console.log(`password === hash? ${password === hash}`);

const compareResultFail = bcrypt.compareSync('abc123', hash); // false
const compareResult = bcrypt.compareSync(password, hash); // true

console.log('Let\'s use bcrypt compare instead!');
console.log('compareResultFail:', compareResultFail);
console.log('compareResult:', compareResult);
