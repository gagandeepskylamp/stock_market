const express = require('express')
var mysql = require('mysql');
var router = express.Router();
var con = require('./db');
const { render } = require('pug');

router.get('/',function(req, res , next){
  
    var query1= 'select * from share';
    con.query(query1,function(err,rows,fields){
      if (err) throw err;
      res.render('users',{title :'shares in market',share : rows})
  });
});
router.post('/create',function(req,res,next){
   var user_number=req.body.user_number;
   var quantity= req.body.quantity;
   var share_code= req.body.share_code;
   var submit=req.body.submit;
   if(submit=="buy"){ 
   var sql1= `update share set in_market=in_market-${quantity} , in_holdings=in_holdings+${quantity}  where share_code=${share_code}`;
   var sql2=`call select_or_insert(${user_number},${share_code},${quantity})`;
   con.query(sql1,function(err,rows,fields){
      if (err) {
         render.send("wrong input");
         res.redirect('/user_market');
      }
    
    console.log(`${quantity} shares removed from company with share code ${share_code}`);
   });
   con.query(sql2,function(err,rows,fields){
    if (err) {
       res.send("wrong input");
       res.redirect('/user_market');
    }
    console.log(`${quantity} shares from company with share code ${share_code} added to user with user_number ${user_number}`);
    res.redirect('/user_market');
   });
  }
  else if(submit=="sell"){
   var sql1= `update share set in_market=in_market+${quantity} , in_holdings=in_holdings-${quantity}  where share_code=${share_code}`;
   var sql2=`update ownership1 set quantity=quantity-${quantity} where user_number=${user_number} and share_code=${share_code}`;
   con.query(sql1,function(err,rows,fields){
      if (err) {
         render.send("wrong input");
         res.redirect('/user_market');
      }
    
    console.log(`${quantity} shares added to company with share code ${share_code}`);
   });
   con.query(sql2,function(err,rows,fields){
    if (err) {
       res.send("wrong input");
       res.redirect('/user_market');
    }
    console.log(`${quantity} shares from company with share code ${share_code} removed from user with user_number ${user_number}`);
    res.redirect('/user_market');
   });

  }

});


module.exports = router