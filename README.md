# Lighthouse Labs | Security & Real World HTTP Servers

[Vimeo Video Recording](https://vimeo.com/906498701/26494cfbd8?share=copy)

* [X] Storing passwords
* [X] Encrypted cookies
* [X] HTTP Secure (HTTPS)
* [X] RESTful API

## What is our current solution for passwords?

How storing passwords right now?

* Storing in-memory
* As plain-text

Why NOT plain-text?

* If someone has the file or access to logs they'll see the real passwords!

In the real world, the site admin, web developer, etc. should not even know people's passwords!

What are ways we can scramble data?

* [ ] Encryption -> Two-way street! Can scramble and de-scramble!
* [X] Hashing -> One-way street! Scrambled, but we shouldn't be able to descramble!

enter a password -> is this the right password?
register -> enter pass -> hashed + salt -> stored
login -> enter pass -> hashed + salt -> DOES THIS MATCH?

## Encryption

READ/WRITE -> SCRAMBLE IT -> TRANSFERRING -> DESCRAMBLE IT -> READ/WRITE

HTTP -> HyperText Transfer Protocol
HTTPS -> HyperText Transfer Protocol Secure

ALL WEB PAGE/FORM DATA -> RAW OVER THE WEB -> SERVER
ALL WEB PAGE/FORM DATA <- RAW OVER THE WEB <- SERVER