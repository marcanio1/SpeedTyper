var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "coms-319-022.cs.iastate.edu",
    user: "team32",
    password: "team32passwordVM@319",
    database: "UserInfo"
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection; 