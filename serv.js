var express = require('express');
var app = express();

app.use("/dist", express.static(__dirname + "/dist"));
app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.listen(8080);
console.log('Сервер стартовал!');