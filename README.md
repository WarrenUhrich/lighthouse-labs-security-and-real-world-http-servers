# Lighthouse Labs | Security & Real World HTTP Servers

* [ ] Storing passwords
* [ ] Encrypted cookies
* [ ] HTTP Secure (HTTPS)

## How have we been storing passwords so far?

* Plain text!
* Not ideal... easy to read!
* If traffic is intercepted, they can understand your password.

## Hashing Passwords

* We want a one-way method of scrambling a password
* The admin, the developer, or a hacker should not be able to read or understand any stored passwords
* Hashing offers us a way of scrambling a password, making it unrecognizable (we will still be able to compare an entered)

`(plaintext + salt) => hashing algorithm => (store) resulting hash`