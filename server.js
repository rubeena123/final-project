
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var clientSessions = require('client-sessions')
var Routes = require('./routes')
var cors   = require('cors')

var app = express();


mongoose.connect('mongodb://localhost/BuddyUp', function (mongooseErr) {
    if (mongooseErr) {
        console.error(mongooseErr);
    } else {
        console.info('Mongoose initilized!');
    }
})


var sessionsMiddleware = clientSessions({
    cookieName: 'auth-cookie',  // front-end cookie name
    secret: 'DR@G0N$$',        // the encryption password : keep this safe
    requestKey: 'session',    // req.session,
    //duration: (86400 * 1000) * 7, // one week in milliseconds
    cookie: {
        ephemeral: false,     // when true, cookie expires when browser is closed
        httpOnly: false,       // when true, the cookie is not accessible via front-end JavaScript
        secure: false         // when true, cookie will only be read when sent over HTTPS
    }
}) // encrypted cookies!

var cors = require('cors');

app.use(cors({
    origin: 'http://10.25.15.30:8100',
    optionsSuccessStatus: 200,
    credentials: true,
    // preflightContinue : true
}))

app.use(sessionsMiddleware)
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

Routes(app); // add our routes in underneath the vertical middleware above!
// app.get('/tab.dash', function(req, res){
//     res.sendFile('tab.dash.html', {root : './www/html'});
//   });
//
//   app.get('/api/users', DashCtrl.get);
//

//   app.get('/', function(req, res){
//     res.sendFile('tab.dash.html', {root : './www/html'});
//   });
//
//   app.get('/api/us', DashCtrl.get);
// }


app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('\n Auth Server UP!');
    }
});
