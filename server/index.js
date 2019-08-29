const http = require('http');
const fs   = require('fs');
const hostname = '127.0.0.1';
const port = 3008;
const countries = require('./countries');

//console.log(countries);
var ID= function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

//get object data from  file
let objBuff = fs.readFileSync('countries.json');
let fileObj = JSON.parse(objBuff);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    if (req.method === "GET" ) {
        let result = JSON.stringify(fileObj);
          res.end(result);
    }
    if (req.method === "POST") {

        console.log('post')
        req.on('data', (data) => {

            //get input value from front
            let countryVal = JSON.parse(data);

            //Prepare obj to write
            let countryObj = {};
            let obj = {country: countryVal};
            let id = ID();
            countryObj[id] = obj;
            let strData = JSON.stringify(countryObj);

            //Merge object
            Object.assign(fileObj,countryObj)
            let result = JSON.stringify(fileObj);
            //write data tofile
            fs.writeFile('countries.json', result, 'utf8',function(err) {
                if (err) throw err;
                console.log('data recieves and saved');
            });
            res.end()
            //res.end(data);
        });
    };
    res.end('Hello World\n')


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});