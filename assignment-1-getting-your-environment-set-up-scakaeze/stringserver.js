var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.write("Hello World. This is Assignment 1 for Stephen Akaeze");
    res.end();
});
server.listen(8080);
console.log("Listening on http://127.0.0.1:8080/");
