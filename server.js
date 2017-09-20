var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var sessionsModule = require('client-sessions')
var request = require('request')
var Discogs = require('disconnect').Client
var HTTP = require('http')
var HTTPS = require('https')
var fs = require('fs')


var dis = new Discogs({
    consumerKey: 'GknZtKeWnvYMYoCbKbfq',
    consumerSecret: 'kSjxyprmLuFGGRdPOoETjOSzHphGyWbq'
}).database()

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
    desertIslandLP3: {
        type: String,
        required: false,
        unique: false,
    },
});
var UserModel = mongoose.model('User', UserSchema)

var LPSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.ObjectId
    },
    catalogNumber: {
        type: String,
        required: false,
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
    albumLabel: {
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
    lpImage: String,
    releaseID: Number,
});
var LPModel = mongoose.model('LP', LPSchema)

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

app.use(function(req, res, next) {
    console.log('URL', req.url);
    console.log('BODY', req.body);
    console.log('SESSION', req.session);
    console.log('QUERY', req.query)
    next();
});

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

// WHAT DOES THIS DO?????
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

// DO I NEED TO ADD THE LPModel TO THIS???  I NEED TO GRAB THE LP'S TIED TO THE USER THAT IS LOGGED IN TO FLESH OUT THE TABLE ON THE COLLECTION PAGE!!
app.get('/me', checkIfLoggedInForAjax, function(req, res){
    UserModel.findOne({_id:req.session._id}, function(err, user){
        console.log('user',user);
        res.send(user)
    })
})

app.get('/me-lps', checkIfLoggedInForAjax, function(req, res){
    LPModel.find({owner:req.session._id}, function(err, lps){
        console.log('lps',lps);
        res.send(lps)
    })
})

// log user out
app.get('/logout', function(req, res){
    console.log('user logged out');
    req.session.reset()
    res.redirect('/')
})

// create a new user, salt and has password, save it in the db
app.post('/signup', function(req, res){
    // this user object has a plain-text password
    // we must hash the password before we save the user
    var newUser = new UserModel(req.body)
    console.log('USER HERE', newUser)
    bcrypt.genSalt(11, function(saltErr, salt){
        if (saltErr) {console.log(saltErr)}
        console.log('salt generated: ', salt)

        bcrypt.hash(newUser.password, salt, function(hashErr, hashedPassword){
            if ( hashErr){ console.log(hashErr) }
            newUser.password = hashedPassword
            console.log('USER HERE 2', newUser)

            newUser.save(function(saveErr, user){
                if ( saveErr ) { console.log(saveErr)}
                else {
                    console.log('USER HERE 3', newUser)
                    req.session._id = user._id // this line is what actually logs the user in.
                    res.send({success:'success!'})
                }
            })
        })

    })
})

// create a new LP record and save it in the database
app.post('/newLP', function(req, res){
    req.body.owner = req.session._id
    var newLP = new LPModel(req.body)
    console.log('new lp',newLP);
    newLP.save(function(saveErr, lp){
        if ( saveErr ) { console.log(saveErr)}
        else {
            res.status(200).send('success!')
        }
    })
})

// delete an LP record and delete it from the database
app.post('/removeLP', function(req, res){
    console.log('req body id',req.body.id);
    LPModel.remove( { releaseID : req.body.id }, function(err){
        if (err) { console.log('err',err)}
        res.send();
    } )
})

app.post('/login', function(req, res){
    if (req.session._id) {
        UserModel.findById(
            req.session._id,
            function(err,data){
                if ( err ) { console.log('failed to find user')}
                res.send(data)
                return
            }
        )
    }
    else {
        UserModel.findOne({username: req.body.username}, function(err, user){
            if ( err ) { console.log('failed to find user')}
            else if ( !user ) {
                console.log('no user found')
                res.send('Failed to log in - no user found')
                return
            }
            else {
                // at this point, we know they're trying to log in as someone who DOES exist in our database, but do they have the right password?
                bcrypt.compare(req.body.password, user.password, function(bcryptErr, matched){
                    if ( bcryptErr ) { console.log(bcryptErr)}
                    //matched will be either true or false
                    else if ( !matched ) {
                        console.log('passwords dont match')
                        res.send('Failed to log in - passwords dont match')
                        return

                    }
                    else {
                        req.session._id = user._id
                        res.send(user)
                        return

                    }

                })
            }
        })
    }
})

app.get('/api/v1/discogs/byrelease', function(req,res){
    console.log('sending data to discogs');
    console.log('req query name',req.query.catalogNumber);
    dis.search(
        {
            catno:req.query.catalogNumber,
            items:1,
            per_page:1,
            type:'release',
        },
        function(err, response, body){
        if (err) {console.log(err);}
        console.log('res', response)
        // console.log('res', body)
        let releaseID = response.results[0].id
        dis.getRelease(releaseID,function(err,response,body){
            console.log(response);
            console.log(body);
            res.status(200).send(response);
        })
        console.log('release ID?',releaseID);
    })
})

// USE THIS CODE ONCE PUSHED UP TO DROPLET
try {
    var httpsConfig = {
        key  : fs.readFileSync('/etc/letsencrypt/live/myvinyl.site/privkey.pem'),
        cert : fs.readFileSync('/etc/letsencrypt/live/myvinyl.site/cert.pem')
    }
    var httpsServer = HTTPS.createServer(httpsConfig, app)
    httpsServer.listen(443)
    var httpApp = express()
    httpApp.use(function(req, res){
        console.log(req.url)
        res.redirect('https://myvinyl.site' + req.url)
    })
    httpApp.listen(80)
}
catch(error){
    console.log(error)
    console.log('could not set up HTTPS')
    app.listen(8080)
}
finally {
    console.log('this code runs regardless of whether the above code succeeded or failed')
}



// app.listen(8080)
