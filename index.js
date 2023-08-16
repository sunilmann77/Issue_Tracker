const express = require('express');
const path = require('path');
const port =8000;
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./config/mongoose');
const User = require('./model/user'); 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('./assets'));

const MongoStore = require('connect-mongo');
const flash =require('connect-flash');
// const customMware =require('./config/middleware');

app.use(expressLayouts);                             
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(session({
    name:'Social',
    secret:'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./router'));

app.listen(port, function(err){
    if(err){
        console.log("error in the running server",err);   
        return;
    }
console.log(" YUP! Server is running on port",port);

});

