const http = require('http');
const fs   = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const data = {"name":'Timaz'};
const countries = require('./countries');


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    if (req.method === "GET" ) {
        let str = JSON.stringify(data);
        res.end(str);
    }

    // if (req.method === "POST" ) {
    //     console.log(req.method);
    // }
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});