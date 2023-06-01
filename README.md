# Security & Real World HTTP Servers

* [X] Storing passwords
* [X] Encrypted cookies
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

## HTTP vs. HTTPS

* HTTP HyperText Transfer Protocol
  * :80
* HTTPS HyperText Transfer Protocol Secure
  * :443
  * From a user perspective, you see a green icon or padlock
  * Encryption for traffic

## CRUD

INDEX  // display all of the resource
CREATE // show the "new" form
READ   // show single of the resource
UPDATE // save changes to existing resource
DELETE // remove the single resource
EDIT   // show the "edit" form
SAVE   // create the new single of the resource

## REpresentational State Transfer (REST)

HTTP only supports GET and POST... but by convention we can expand
this to help communicate our routes' purpose

```
            METHOD   PATH
|-----------|--------|---------------------|--------------------------|--------------|
| I (ndex)  | GET    | /resources          | Show all of resource     | DISPLAY ALL  |
| C (reate) | GET    | /resources/new      | Show New Resource Form   | DISPLAY FORM |
| R (ead)   | GET    | /resources/:id      | Display Resource         | DISPLAY INFO |
| U (pdate) | PUT    | /resources/:id      | Apply Update to Resource | APPLY EFFECT | REPLACE ALL DATA
| U (pdate) | PATCH  | /resources/:id      | Apply Update to Resource | APPLY EFFECT | REPLACE SOME DATA
| D (elete) | DELETE | /resources/:id      | Delete the Resource      | APPLY EFFECT |
| E (dit)   | GET    | /resources/:id/edit | Show Edit Resource Form  | DISPLAY FORM |
| S (ave)   | POST   | /resources          | Save New Resource        | APPLY EFFECT |
```
