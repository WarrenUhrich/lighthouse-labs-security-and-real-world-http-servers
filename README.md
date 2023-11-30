# Security & Real World HTTP Servers

* [X] Storing passwords
* [X] Encrypted cookies
* [X] HTTP Secure (HTTPS)

## Plain Text...

Why not plain text?

* If someone gains access to the DB they'll see all the passwords!
* Even the admin can see passwords if they check the DB.

## What can we do instead of plain text?

* Encryption -> read...lock-up...read
* Hashing -> lock-up...we don't want to read the original anymore

## Hashing Process...

(plaintext_pass + salt) => hashing algorithm => hashed_pass

## HTTP / HTTPS

HTTP  HyperText Transfer Protocol
HTTPS HyperText Transfer Protocol Secure

HTTP  -> plaintext
HTTPS -> encrypted
  -> SSL (secure socket layer)
  -> TLS (transport layer security)

## RESTful APIs

REpresentational State Transfer

Routes are our method + path combinations...

REST is a convention for how we organize/name our routes.

blog_posts

Index      GET               /posts          Index of posts.
Create     GET               /posts/new      Create form (user sees the form here.)
Read       GET               /posts/:id      Show one post.
Update     POST[PUT/PATCH]   /posts/:id      Handle submission of form (update existing post.)
Delete     POST[DELETE]      /posts/:id/delete
                             /posts/:id
Edit       GET               /posts/:id/edit Edit form (user sees the form here.)
Save       POST              /posts          Handle submission of form (save the new post.)


blog_posts_api

GET    /posts     -> Index
GET    /posts/:id -> Read/Show
POST   /posts     -> Save
PUT    /posts/:id -> Update
PATCH  /posts/:id -> Partial Update
DELETE /posts/:id -> Delete