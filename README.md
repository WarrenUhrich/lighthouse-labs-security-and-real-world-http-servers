# Security & Real World HTTP Servers

* [X] Storing passwords (Hashes)
* [X] Encrypted cookies (Encrypted Cookie + Sessions)
* [X] HTTP Secure (HTTPS)

## Storing Passwords

* Hashing!
* Hashing is a process in which we scramble text in a one-way fashion

plain => hashing algorithm => hash
plain => camparison function

`bcryptjs`

## Encrypting Cookies

* Encryption is two-way...

plain => encryption algorithm => encrypted
encrypted => decryption algorithm => plain

`cookie-session`

## HyperText Transfer Protocol (HTTP) versus HTTP Secure (HTTPS)

* HTTP is a plain-text protocol
    * All page content
    * All body (from form submissions)
    * Address requested
        * ALL raw / plain text!
* HTTPS is an encrypted protocol
    * Server public key (certificate)
    * Client private key

## REST (REpresentational State Transfer)

A convention for naming and organizing routes in a web app or API.

METHOD  PATH
GET     /cheeses          => INDEX: list of all the cheeses
GET     /cheeses/:id      => SHOW:  display a specific cheese (by id)
GET     /cheeses/new      => CREATE: display FORM for adding a new cheese
POST    /cheeses          => SAVE:  add new cheese (form is submitted)
GET     /cheeses/:id/edit => EDIT: display FORM for editing a cheese
PUT     /cheeses/:id      => UPDATE: replacement of the existing cheese (all fields changed)
PATCH   /cheeses/:id      => UPDATE: some fields are changed, save these changes to the cheese
DELETE  /cheeses/:id      => DELETE: remove this cheese

HTTP ONLY supports GET and POST. Other methods or verbs must be communicated to the server in an alternative way...

