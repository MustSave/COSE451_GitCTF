const devMode = !process.env.DEV
module.exports = {
    httpOnly: true,           // cannot modify with javascript
    secure: devMode,          // if true, active only https
    secret: 'secret key',     // secret key to encrypt
    resave: true,             // if false, then save only session changed
    saveUninitialized: false, // 
    name: 'sessionId',        // set cookie name
    reapInterval: 1,          // delete expired session
    cookie: {                 // cookie options
        httpOnly: true,
        secure: devMode
    }
}