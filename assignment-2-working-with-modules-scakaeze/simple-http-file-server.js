//simple (and incomplete) http server
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var mime_and_time_extractor = require('./file-to-mime.js')

http.createServer((req,res) => {
    // get the filepath part of the url requested
    const { pathname }  = url.parse(req.url);
console.log("pathname is %s", pathname);

// get the actual system filepath for this
var filepath = path.join(process.cwd(), pathname);
console.log("filepath is %s", filepath);

// extract the filename extension
var extname = String(path.extname(filepath)).toLowerCase();

// set up mimetypes and associated filename extensions
var contentType = 'text/html';
var mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png'
};
// set mimetype if it is known
contentType = mime_and_time_extractor.mimeTypes[extname] || 'application/octet-stream';

// see if this file exists
fs.stat(filepath, (err, stat) => {
    if (err){
        // handle case of file not found
        if (err.code == 'ENOENT'){
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("404 Not Found\n");
            console.log("EOENT Error")
            console.log(err);
            return;
        }
        // if an error other than EOENT, handle that here
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("500 Error\n");
        console.log("500 error")
        console.log(err);
        return;
    }
    if(stat.isDirectory()) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    var dir = "";

    fs.readdir(filepath, function(err, items) {
        items.forEach(item => {
            dir += `${item}\n`;
    });
        res.write(dir);
        console.log(mime_and_time_extractor.logger.log('is the timestamp of the server response'));
        console.log(`Delivered Directory Listing:\n${dir}`);
        res.end();
    });
    return;
}
// try to read the file from disk
fs.readFile(filepath, (err, data) => {
    if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("500 Error\n");
        console.log("Read file error")
        console.log(err);
        return;
    }
    // send the data to the browser via the response
    res.writeHead(200, {"Content-Type": contentType})
res.write(data);
res.end();
console.log("delivered %s", pathname);
});
});

}).listen(8080).on('listening', () => {
    console.log("Server is listening");
});