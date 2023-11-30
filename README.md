# Security & Real World HTTP Servers

[GitHub Repository Branch](https://github.com/WarrenUhrich/lighthouse-labs-security-and-real-world-http-servers/tree/2023.11.30-web-flex-day-16october2023) | [Vimeo Video Recording (Coming Soon)](#coming-soon)

* [X] Storing passwords
* [X] Encrypted cookies
* [X] HTTP Secure (HTTPS)

## Storing Passwords

It is bad practice to store passwords in plain text. In a good, secure, system it should be difficult (if not impossible) for even the administrators or developers to read the passwords created by users. If a user should need to reset their password, we should find secure ways to go about it—this may come in the form of some processes you've likely encountered on popular websites. Think about links that may have read "Forget your password?" on your favourite websites. They often e-mail you a secure link (note they never send the password you had set—e-mail often isn't very secure), or allow you to answer security questions in order to confirm who you are and allow you to enter a replacement password.

Back to combatting the use of plain text: how do we avoid saving passwords in such a transparent way? The answer is by hashing it! What *is* a hash, though?

This term can mean a few different things in technology, depending on the context. In the case of password hashing, it means we will take a value (the password entered) and run it through a **one-way** scrambling process. After scrambling, we can store it, and any eyes that may happen upon the value will never know what the original would have been.

If we have a value that has been scrambled though, what happens if someone tries to enter a password that we need to match to it? We scramble it via the same process, and check if these match.

Hashing (the scrambling we're talking about) runs through a set process that can be composed of multiple steps. In order to help further randomize this process we often incorporate unique "salts" that modify or tack-on to the value before or during this transformation and make it even harder to reverse engineer.

`(plaintext + salt) => hashing algorithm => hash (more secure password)`

Common or default salt and hash combinations may be used to create tables composed of hashes from the most popular passwords. These are called rainbow tables, and are sometimes used to guess passwords or check for such popular combinations—it pays to ensure you're doing your due diligence to avoid vulnerability to such attacks.

One of the easiest (and safest) ways to hash passwords yourself is to make use of a robust, battle-tested, existing package like [bcrypt.js](https://www.npmjs.com/package/bcryptjs).

Have a look at what lives inside of `bcrypt`:

```JavaScript
const bcrypt = require('bcryptjs');
console.log(bcrypt); // You'll see a variety of methods that this library offers us.
```

How do we use bcrypt? Let's look at the steps in the documentation:

```JavaScript
const bcrypt = require('bcryptjs');  // Grab the library.
const salt = bcrypt.genSaltSync(10); // Generate a salt.
console.log('salt', salt); // Curious about what a salt looks like?

// Hash a plaintext password.
const plaintextPass = 'myp4ss';
const hash = bcrypt.hashSync(plaintextPass, salt);
console.log('hash', hash); // Curious about what a hash looks like?

const testPass1 = 'abc123'; // Shouldn't match our above plaintext password.
const testPass2 = 'myp4ss'; // Should match our above plaintext password!

// Check if an entered password matches.
console.log('Does testPass1 match \'hash\'?', bcrypt.compareSync(testPass1, hash)); // false
console.log('Does testPass2 match \'hash\'?', bcrypt.compareSync(testPass2, hash)); // true
```

There is the alternative asynchronous method set / syntax as well, if you prefer:

```JavaScript
const bcrypt = require('bcryptjs');

const plaintextPass = 'myp4ss';
bcrypt.genSalt(10, (err, salt) => {
  console.log('salt', salt);
  bcrypt.hash(plaintextPass, salt, (err, hash) => {
    console.log('hash', hash);
    
    const testPass1 = 'abc123';
    const testPass2 = 'myp4ss';

    bcrypt.compare(testPass1, hash, (err, result) => {
      console.log('Does testPass1 match \'hash\'?', result);
    });
    
    bcrypt.compare(testPass2, hash, (err, result) => {
      console.log('Does testPass2 match \'hash\'?', result);
    });
  });
});
```

If you'd like to reduce the amount of indenting (nested callbacks) you can opt for the promise-based approach instead (recall that a `return` in a `.then` will pass a value down to the following `.then` in the chain):

```JavaScript
const bcrypt = require('bcryptjs');

const plaintextPass = 'myp4ss';
bcrypt.genSalt(10);
      .then((salt) => {
        console.log('salt', salt);
        return bcrypt.hash(plaintextPass, salt);
      })
      .then((hash) => {
        console.log('hash', hash);
        
        const testPass1 = 'abc123';
        const testPass2 = 'myp4ss';

        bcrypt.compare(testPass1, hash)
              .then((result) => {
                console.log('Does testPass1 match \'hash\'?', result);
              });

        bcrypt.compare(testPass2, hash)
              .then((result) => {
                console.log('Does testPass2 match \'hash\'?', result);
              });
      });
```

Note that this library is written in JavaScript, so you are able to read the source code if you get curious about how the included methods operate:

`/node_modules/bcryptjs/dist/bcrypt.js`

Curious which companies have made the mistake of not taking steps like these to protect your password? Visit [Plain-Text Offenders](https://github.com/plaintextoffenders/plaintextoffenders), plenty have been caught! Luckily, many have [reformed](https://github.com/plaintextoffenders/plaintextoffenders/blob/master/reformed.csv) their approach to better serve their userbase.


## Encrypted Cookies

Alright, so our passwords are more secure—we're safe now, right!? Not quite...

Cookies are key-value pairs controlled by clients. Yes, we can tell a browser what cookie value we'd *like* it to store... but it is ultimately up to the browser and the user to honour this. The client reserves the right to add, edit, or delete cookies at its leisure! We don't *really* have control over what is stored in a browser's cookie data. Why is this a problem?

In our last day's example, we used a cookie to store the current user's ID. Open your browser developer tools, see if you can change the user ID cookie assigned under localhost. Now refresh a signed in page of your application. If that user ID matches a valid account in your app... you're in. Without even knowing your password, someone with your ID can just waltz in!

This is clearly unnacceptable, and a grossly inappropriate way to handle keeping track of who is who in a secure way. So, what's the alternative? Make these identifying cookies difficult, or near-impossible to guess. How have we done that so far?

That's right, hashing! However, if we hash a cookie's value and send it to the browser... when we get it back from the browser, will we be able to reverse-engineer this value and find out what user ID it was associated with? *Probably not.* The point of a hash is that it is **one-way**—we don't intend to ever read the original value ever again. So, back to the drawing board. We'll need something else to make our cookie value look scrambled... something that we can still convert back to the original value when the server gets it back.

This is where **encryption** comes in. Hashing's strength, and sometimes weakness, is that it is a one-way process. Encryption is a *two-way* process. We *are* able to convert it back to the original value and see if it represents what we think it does:

`plaintext => encryption algorithm => encrypted text (sent to browser)`

`encrypted text => decryption algorithm => plaintext (received on server)`

There is a package that can help us with this process, offering a syntax that is quite simple: [cookie-session](https://www.npmjs.com/package/cookie-session). Basic usage might look something like this:

```JavaScript
const express = require('express');
const cookieSession = require('cookie-session');

const app = express();
const PORT = 8080;

app.use(cookieSession({
  // Mandatory properties.
  name: 'session', // Name of the cookie (shows in the browser.)
  keys: ['secrets', 'can be', 'rotated'] // Used for encrypting values.

  // (Optional) consider adding additional options.
  maxAge: 24 * 60 * 60 * 1000 // Expire the identifying cookie / session in 24 hours.
}));

app.get('/', (req, res) => {
  req.session.testValue = 'ABCD1234!'; // Set a value for this user's session (does NOT appear in the browser.)
  res.end(req.session.testValue); // Access a value from this user's session.
});

app.get('/destroy-session', (req, res) => {
  req.session = null; // Delete current session.
  res.redirect('/');
});

app.listen(PORT);
```

Note that in a case like keeping track of a user, any and all values associated with their sign-in and account are usually considered values that we want to protect from prying eyes. We would **not** assign these to *cookies in the browser.* Instead, we would assign these to a **server's session storage**, which is not visible to the browser.

A "session" in this sense only uses an encrypted and unique **session ID** cookie in the web browser to keep track of who we are representing. Beyond this, all session key-value pairs are kept soley on the server-side. This means the user will **not** be able to edit these values, but we can still use them to customize and inform a user's experience on our web application. In the case of today's example, that means keeping track of which user ID the user has signed in with—taking full advantage of the security we are afforded by not allowing the ID into the cookie directly. Much better!

For today's example, we would remove entirely our `cookie-parser` package from the project, as we no longer need to store information about the user using traditional browser-based key-value pairs (aside from the one that `cookie-session` is already assigning as an identifier.) 

`request => server => middleware (set req.session) => route handler (we can access / edit req.session) => middleware (req.session cookie encrypted, created, and encrypted, sent along with reponse to browser)`

## HyperText Transfer Protocol (HTTP) versus HTTP Secure (HTTPS)

You've likely noticed as you've browsed different sites across the web that some addresses begin with the HTTP:// protocol and others the HTTPS:// protocol. What's the difference?

HTTP is a plain-text protocol. All packets and files are sent rather plainly across the network. The concern here, is especially on untrusted networks (like a café's wi-fi), there may be third parties able to read your requests, and the server's responses. That might not matter if you're simply viewing a restaurant menu, but as soon as more sensitive data like your e-mails, sign-in pages, medical info, or private chat logs, you likely want a bit more privacy! This is where HTTPS comes in—it is a system in which a security certificate is installed on a server, complete with encryption keys. Each visitor to the site will generate a key compatible with the server's public key—only this precise combination can be used to unlock the transmission's contents, effectively protecting any data traveling across your network and the web at large.

The installation process may vary a bit between different providers and environments, so don't be afraid to ask your service provider of choice for more information on configuring a certificate of your own. In recent years, a few [free alternatives](https://letsencrypt.org/) have entered the fray! Keep in mind, paid or not, certificates are expected to be renewed and maintained over time (often once a year, and this process can often be automated.)

## REpresentational State Transfer (REST)

REST is a convention for naming or organizing the routes we build for a web application or API. For this to make more sense, we should explore the types of routes we might normally want to represent.

Many applications have a goal of assisting users in interacting with resources in the following ways (CRUD):

```
|-----------|------|----------------|--------------------------|--------------|
| C (reate) | GET  | /resources     | Show New Resource Form   | DISPLAY FORM |
| R (ead)   | GET  | /resources/:id | Display Resource         | DISPLAY INFO |
| U (pdate) | POST | /resources/:id | Apply Update to Resource | APPLY EFFECT |
| D (elete) | POST | /resources/:id | Delete the Resource      | APPLY EFFECT |
```

This isn't totally complete. Notice in the case of "Update," for example, we probably want to have a GET route to show an "Edit" form, as well as the POST one to actually handle the submission and apply an update. Consider CRUDES, as it covers the URLs more accurately:

```
|-----------|------|----------------|--------------------------|--------------|
| C (reate) | GET  | /resources     | Show New Resource Form   | DISPLAY FORM |
| R (ead)   | GET  | /resources/:id | Display Resource         | DISPLAY INFO |
| U (pdate) | POST | /resources/:id | Apply Update to Resource | APPLY EFFECT |
| D (elete) | POST | /resources/:id | Delete the Resource      | APPLY EFFECT |
| E (dit)   | GET  | /resources/:id | Show Edit Resource Form  | DISPLAY FORM |
| S (ave)   | POST | /resources     | Save New Resource        | APPLY EFFECT |
```

Another acronym that perhaps even better captures how users interact with our resources is BREAD:

|-----------|------|----------------|--------------------------|--------------|
| B (rowse) | GET  | /resources     | Show All of Resource     | DISPLAY INFO |
| R (ead)   | GET  | /resources/:id | Display Resource         | DISPLAY INFO |
| E (dit)   | GET  | /resources/:id | Show Edit Resource Form  | DISPLAY FORM |
| A (dd)    | GET  | /resources     | Show New Resource Form   | DISPLAY FORM |
| D (elete) | POST | /resources/:id | Delete the Resource      | APPLY EFFECT |

Despite these being easy-to-remember, they do lack an easy way to capture how many routes are really required. A weakness of all the approaches above, is that for a set of routes to be considered RESTful, there should be different verbs (`GET` / `POST`) for each unique path... there is a lot of repetition above, which means the server will be confused and might run the wrong route—or we have to add layers of additional logic to check if a form is submitting or not, what sort of information might be submitting, etc. To avoid that headache, the REST convention offers us some new verbs to use. Observe:

```
|-----------|--------|---------------------|----------------------------|--------------|
| I (ndex)  | GET    | /resources          | Show All of Resource       | DISPLAY INFO |
| C (reate) | GET    | /resources/new      | Show New Resource Form     | DISPLAY FORM |
| R (ead)   | GET    | /resources/:id      | Display Resource           | DISPLAY INFO |
| U (pdate) | PUT    | /resources/:id      | Replace Resource           | APPLY EFFECT |
| U (pdate) | PATCH  | /resources/:id      | Partial Update to Resource | APPLY EFFECT |
| D (elete) | DELETE | /resources/:id      | Delete the Resource        | APPLY EFFECT |
| E (dit)   | GET    | /resources/:id/edit | Show Edit Resource Form    | DISPLAY FORM |
| S (ave)   | POST   | /resources          | Save New Resource          | APPLY EFFECT |
```

These new verbs are really `POST` in special dressing. HTTP only *really* supports `GET` and `POST`, so under the hood we have these other methods spoofed for our convenience. What do these verbs mean?

* `GET`    Request a Resource
* `POST`   Create a Resource
* `PUT`    Update / Replace all of a Resource
* `PATCH`  Update / Replace Part of a Resource
* `DELETE` Remove a Resource

Using these verbs in combination with careful naming of your paths to intuitively communicate to other developers what each route is for. If you are careful and consistent with this convention, other developers will know exactly what each route is for without the need for a comment or additional context. In fact, you'll find many developers, once they know the names of resources, can guess most any routes that might exist in a particular project.

## Method Overriding in Express

Recall that the only methods / verbs actually supported by HTTP are `GET` and `POST`. If this is the case, how do we even get a form to submit with a `PUT`, `PATCH`, or `DELETE` method? This is called **method overriding.** We essentially find one way or another to let the server know which verb we mean, even if we can't directly say something like `<form method="patch"><!-- This method would be invalid. -->`.

One package that might help us out on this is [`method-override`](https://github.com/expressjs/method-override). It offers a few ways for us to capture these conventional verbs in form submissions. It requires a little set-up:

```JavaScript
const express = require('express');
const methodOverride = require('method-override');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.put('/put-test', (req, res) => {
  res.end('PUT test received!');
});

app.listen(PORT);
```

Your form would look something like...

```HTML
<!-- Note the query parameter tagged on to our action URL: -->
<form method="POST" action="/put-test?_method=PUT">
  <input type="submit" value="Click to PUT">
</form>
```

## Resources

* [Plain Text Offenders](https://github.com/plaintextoffenders/plaintextoffenders/blob/master/offenders.csv)
* [How Does Encryption Work?](https://medium.com/searchencrypt/what-is-encryption-how-does-it-work-e8f20e340537)
* [What is HTTPS?](https://www.cloudflare.com/learning/ssl/what-is-https/)
* [Asymmetric Cryptography](https://searchsecurity.techtarget.com/definition/asymmetric-cryptography)
* [Client Session vs Server Session](http://www.rodsonluo.com/client-session-vs-server-session)
* [Resource Naming](https://restfulapi.net/resource-naming/)
* [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
* [Method Override Package](https://www.npmjs.com/package/method-override)
* [Express Response Object](http://expressjs.com/en/api.html#res)
* [List of common Express middleware](https://expressjs.com/en/resources/middleware.html)
