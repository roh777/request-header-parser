// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  console.log(request.headers);
});

function makeWhoAmI(header) {
  this.ipaddress = header['x-forwarded-for'].split(",")[0];
  this.language = header['accept-language'].split(",")[0];
  var ua = header['user-agent'];
  var bracketBegins = ua.indexOf('(');
  var bracketEnds = ua.indexOf(')');
  this.software = ua.substr(bracketBegins, bracketEnds-bracketBegins+1);
  
}

app.get("/whoami", function(request, response){
  response.send(new makeWhoAmI(request.headers));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
