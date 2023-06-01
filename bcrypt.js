const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
console.log('salt:', salt);

const password = '456';

// Example) someone is registering, we want to hash their password

const hash = bcrypt.hashSync(password, salt);
console.log('hash:', hash);

// Example) someone is trying to sign in, we need to match their entered password with the hash
const userEntered = 'p4ss';
const validated = bcrypt.compareSync(userEntered, hash);
console.log(`Was ${userEntered} a match?`, validated);

