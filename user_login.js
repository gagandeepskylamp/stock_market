const express = require('express')
var mysql = require('mysql');
var router = express.Router();
var con = require('./db');





router.get('/',function(req, res , next){
  
   
      res.render('user_login',{title :'login'})
 
});
module.exports = router