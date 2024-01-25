const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
console.log('salt:', salt);

const pass = 'rosa';
const hash = bcrypt.hashSync(pass, salt);
console.log('hash:', hash);

const userEnteredPass1 = 'not-correct';
const pass1Match = bcrypt.compareSync(userEnteredPass1, hash);
console.log('pass1Match:', pass1Match); // false

const userEnteredPass2 = 'rosa';
const pass2Match = bcrypt.compareSync(userEnteredPass2, hash);
console.log('pass2Match:', pass2Match); // true
