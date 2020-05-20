const fs = require('fs');
const path = require('path');
const http = require("http");
const resolve = (relatedPath) => path.join(__dirname, relatedPath);

const server = http.createServer((req, res) => {
    console.log("request received")
    console.log(req.headers);
    let url = req.url;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.setHeader('Transfer-Encoding', 'chunked');
    let tag = url.split(/[\/?]/)[1];
    if (tag === 'text') {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
    }


    let resposeHTML = fs.readFileSync(resolve('response/index.html'));
    res.end(resposeHTML);
});

console.log("server start on 8088");
server.listen(8088);