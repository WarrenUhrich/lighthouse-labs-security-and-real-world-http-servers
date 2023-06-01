# Security & Real World HTTP Servers

* [ ] Storing passwords
* [ ] Encrypted cookies
* [ ] HTTP Secure (HTTPS)

## Storing Passwords

What have we tried so far?

* Plain text string in a user object
* Database breach / file leak - hacker can read all the passwords
* Delivering plain text over the web, any "middle people" will be able to easily read this

We want to find ways to scramble passwords so that they aren't easily recognizable by people.

* We want to hash a password
* Hashing is a one-way scrambling
* No one should be able to read/determine the original password again

## Difference Between Hashing and Encryption!?

Hashing... one-way street! We scramble... and NEVER get to unscramble!
Encryption... two-way street! We can scramble and unscramble.
