# Lighthouse Labs | Security & Real World HTTP Servers

* [X] Storing passwords
* [X] Encrypted cookies
* [X] HTTP Secure (HTTPS)

## How have we been storing passwords so far?

* Plain text!
* Not ideal... easy to read!
* If traffic is intercepted, they can understand your password.

## Hashing Passwords

* We want a one-way method of scrambling a password
* The admin, the developer, or a hacker should not be able to read or understand any stored passwords
* Hashing offers us a way of scrambling a password, making it unrecognizable (we will still be able to compare an entered)

`(plaintext + salt) => hashing algorithm => (store) resulting hash`

## REST (REpresentational State Transfer)

* Resource (Blog Posts / Users / Dinosaurs)
* CRUD

Express Routes:

* C
    * GET  /resources/new (SHOW CREATE FORM)
    * POST /resources     (SUBMIT CREATE FORM)
* R
    * GET /resources     (INDEX / READ ALL)
    * GET /resources/:id (SHOW / SINGLE RESOURCE)
* U
    * GET  /resources/:id/edit (SHOW EDIT FORM)
    * POST /resources/:id      (SHOW EDIT FORM)
* D
    * POST /resources/:id/destroy


### RESTFUL ROUTES

* C
    * GET  /resources/new (SHOW CREATE FORM)
    * POST /resources     (SUBMIT CREATE FORM)
* R
    * GET /resources     (INDEX / READ ALL)
    * GET /resources/:id (SHOW / SINGLE RESOURCE)
* U
    * GET    /resources/:id/edit (SHOW EDIT FORM)
    * PUT    /resources/:id      (SUBMIT EDIT FORM)
    * PATCH  /resources/:id      (SUBMIT EDIT FORM)
* D
    * DELETE /resources/:id/destroy
