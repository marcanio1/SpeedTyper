var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
cryptr = new Cryptr('myTotalySecretKey');
var path = require('path');
 
module.exports.register=function(req,res){
  var pass1 = req.body.password;
  var pass2 = req.body.passwordconfirm;
  var email=req.body.email;
  var verified=true;
  var regPath = path.resolve(__dirname, '..', 'views/login.html');

  if (pass1=="")
  {
    verified=false;
  }
  if (pass1!="" && pass2=="")
  {
    verified=false;
  }
  else if (pass1!=pass2)
  {
    //Passwords do not match
    res.sendFile(regPath);
    verified=false;
  }

  if (email=="")
  {
    verified=false;
  }
  else if (!checkEmail(email))
  {
    //Email is not in valid format
    res.sendFile(regPath);
    verified=false;
  }


  if(verified==true)
  {
    var encryptedString = cryptr.encrypt(req.body.password);
    var user=[
      [email, encryptedString]
    ];
    var sqlInsert = "INSERT INTO Login (username, password) VALUES ?";
      connection.query(sqlInsert,[user], function (err, results) {
        if (err) {
          //Email already in use
          res.sendFile(regPath);
        }
        else{
            req.session.loggedin=true;
            req.session.username=email;
            //successful registration
            res.render("index.html");
        }
      });
  }
}

function checkEmail(str) {
  //      First part  @     .     Last part is com it can only be 2-3 letters
  return /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/.test(str);
}