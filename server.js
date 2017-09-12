var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var sessionsModule = require('client-sessions')

var app = express()

// express static middleware
app.use(express.static('./public'))

// sessions middleware
app.use(sessionsModule({
    cookieName: 'auth-cookie',  // front-end cookie name
    secret: 'Dr@g0nB4ll$',        // the encryption password : keep this safe
    requestKey: 'session',    // we can access our sessions at req.session,
    duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
})) // encrypted cookies!

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** Database setup **/
mongoose.connect('mongodb://localhost/myvinyl', function(mongooseErr) {
    if( mongooseErr ) { console.error(mongooseErr) }
    else { console.info('Mongoose initilized!') }
})

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Date,
        default: function(){ return new Date() }
    },
    firstName: {
        type: String,
        required: false,
        unique: false,
    },
    lastName: {
        type: String,
        required: false,
        unique: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: Date,
        required: false,
        unique: false,
    },
    favoriteArtist: {
        type: String,
        required: false,
        unique: false,
    },
    desertIslandLP1: {
        type: String,
        required: false,
        unique: false,
    },
    desertIslandLP2: {
        type: String,
        required: false,
        unique: false,
    },
    desertIslandLP2: {
        type: String,
        required: false,
        unique: false,
    },
});
var UserModel = mongoose.model('User', UserSchema)

var LPSchema = new mongoose.Schema({
    catalogNumber: {
        type: String,
        required: true,
        unique: false,
    },
    artistName: {
        type: String,
        required: false,
        unique: false,
    },
    albumName: {
        type: String,
        required: false,
        unique: false,
    },
    albumYear: {
        type: String,
        required: false,
        unique: false,
    },
    albumGenre: {
        type: String,
        required: false,
        unique: false,
    },
    created: {
        type: Date,
        default: function(){ return new Date() }
    },
    mediaCondition: {
        type: String,
        required: false,
        unique: false,
    },
    sleeveCondition: {
        type: String,
        required: false,
        unique: false,
    },
    purchasePrice: {
        type: Number,
        required: false,
        unique: false,
    },
});
var LPModel = mongoose.model('LP', UserSchema)

var checkIfLoggedIn = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in")
        next()
    }
    else {
        console.log("no one is logged in")
        res.redirect('/')
    }
}

var checkIfLoggedInForAjax = function(req, res, next){
    if ( req.session._id ) {
        console.log("user is logged in")
        next()
    }
    else {
        console.log("no one is logged in")
        res.send({failure:'not logged in'})
    }
}

app.use(function(req, res, next){
    console.log('session? ', req.session)
    next()
})

// app.get('/', function(req, res){
//     res.sendFile('./html/login.html', {root:'./public'})
// })

// app.get('/session-test', function(req, res){
//     console.log('session? ', req.session)
//     if ( !req.session.counter ) {
//         req.session.counter = 1
//     }
//     else {
//         req.session.counter++
//     }
//     res.send('session counter: ' + req.session.counter)
// })

app.get('/dashboard', checkIfLoggedIn, function(req, res){
    UserModel.findOne({_id: req.session._id}, function(err, user){
        if ( user ) {
            res.send(`Hello, ${user.username}. Welcome to your dashboard!
                <a href="/logout">Log Out</a>
            `)
        }
        else {
            res.send("you don't belong here!")
        }
    })
})

app.get('/me', checkIfLoggedInForAjax, function(req, res){
    UserModel.findOne({_id:req.session._id}, function(err, user){
        res.send(user)
    })
})

app.get('/logout', function(req, res){
    req.session.reset()
    res.redirect('/')
})

app.post('/signup', function(req, res){
    // this user object has a plain-text password
    // we must hash the password before we save the user
    var newUser = new UserModel(req.body)
    bcrypt.genSalt(11, function(saltErr, salt){
        if (saltErr) {console.log(saltErr)}
        console.log('salt generated: ', salt)

        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if ( hashErr){ console.log(hashErr) }
            newUser.password = hashedPassword

            newUser.save(function(saveErr, user){
                if ( saveErr ) { console.log(saveErr)}
                else {
                    req.session._id = user._id // this line is what actually logs the user in.
                    res.send({success:'success!'})
                }
            })
        })

    })
})

app.post('/login', function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user){
        if ( err ) { console.log('failed to find user')}
        else if ( !user ) {
            console.log('no user found')
            res.send('<h1>Failed to log in</h1>')
        }
        else {
            // at this point, we know they're trying to log in as someone who DOES exist in our database, but do they have the right password?
            bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                if ( bcryptErr ) { console.log(bcryptErr)}
                //matched will be either true or false
                else if ( !matched ) {
                    console.log('passwords dont match')
                    res.send('<h1>Failed to log in</h1>')
                }
                else {
                    req.session._id = user._id
                    res.send({success:'success!'})
                }

            })
        }
    })
})

// // 404 page
// app.get('/404', function(req,res){
//     res.sendFile('./html/404.html', {root: './public'})
// })
//
// // 404 error handling middleware
// app.use(function(req, res, next){
//     res.status(404)
//     res.redirect('/404')
// })

// USE THIS CODE ONCE PUSHED UP TO DROPLET
// try {
//     var httpsConfig = {
//         key  : fs.readFileSync('/etc/letsencrypt/live/myvinyl.site/privkey.pem'),
//         cert : fs.readFileSync('/etc/letsencrypt/live/myvinyl.site/cert.pem')
//     }
//     var httpsServer = HTTPS.createServer(httpsConfig, app)
//     httpsServer.listen(443)
// }
// catch(error){
//     console.log(error)
//     console.log('could not set up HTTPS')
// }
// finally {
//     console.log('this code runs regardless of whether the above code succeeded or failed')
// }
//
// var httpApp = express()
// httpApp.use(function(req, res){
//     console.log(req.url)
//     res.redirect('https://myvinyl.site' + req.url)
// })
// httpApp.listen(80)

app.listen(8080)
