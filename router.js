var url = require('url');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render("index.html");
        console.log("Home page displayed");
    });

    app.get('/register.html', function (req, res) {
        res.sendFile(__dirname+"/views/register.html" );
     });
     
     app.get('/login.html', function (req, res) {
        res.sendFile(__dirname+"/views/login.html" );
     });

     app.get('/RLGL.html', function (req, res) {
        res.sendFile(__dirname+"/views/RLGL.html");
    });

    app.get('/RandomChar.html', function (req, res) {
        res.sendFile(__dirname+"/views/RandomChar.html");
    });

    app.get('/TypeFight.html', function (req, res) {
        res.sendFile(__dirname+"/views/TypeFight.html");
    });

    app.get('/TypeTest.html', function (req, res) {
        res.sendFile(__dirname+"/views/TypeTest.html");
    });

    app.get('/TypeBox.html', function (req, res) {
        res.sendFile(__dirname+"/views/TypeBox.html");
    });
};