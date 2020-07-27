var createError = require('http-errors');
const express = require('express')
const path = require('path');
const hbs = require('hbs');
//const bodyParser = require('body-parser');
var logger = require('morgan');
var mysql = require('mysql');
const app = express()
const port = 3000
var user_market = require('./user_market')
var user_profile = require('./user_profile')
var user_login =require('./user_login')
var con = require('./db');
const cookieParser = require('cookie-parser');


app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req, res , next){
  
  
    res.render('home',{title :'home'});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
app.use('/user_market', user_market)
app.use('/user_profile', user_profile) 
app.use('/user_login',user_login)

