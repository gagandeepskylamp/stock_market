const express = require('express')
var mysql = require('mysql');
var router = express.Router();
var con = require('./db');

router.post('/logedin',function(req, res , next){
  var user_number=req.body.user_number;
  var password =req.body.password;
    var query2= `select o.share_code,o.quantity  from ownership1 o,users u where u.user_number=o.user_number and u.user_number=${user_number} and u.user_password="${password}"`;
    con.query(query2,function(err,rows,fields){
      if (err) throw err;
      res.render('user_profile',{title :'user shares',ownership : rows})
  });
});
module.exports = router