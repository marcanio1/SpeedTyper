var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var connection = require('./../config');
var path = require('path');

module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var loginPath = path.resolve(__dirname, '..', 'views/login.html');
    connection.query('SELECT * FROM Login WHERE username = ?',[email], function (error, results, fields) {
      if (error) {
        res.send('Error logging in');
      }
      else{
        if(results.length >0){
            decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                req.session.loggedin=true;
                req.session.username=email;
                res.render("index.html");
            }
            else{
              //Incorrect password
              res.sendFile(loginPath);
            }
        }
        else{
          //Email not registered
          res.sendFile(loginPath);
        }
      }
    });
}