const http = require('http');
const fs   = require('fs');
const hostname = '127.0.0.1';
const port = 3008;
const countries = require('./countries');

//console.log(countries);
var ID= function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

let objBuff = fs.readFileSync('countries.json');
let fileObj = JSON.parse(objBuff);

const server = http.createServer((req, res) => {
    //get object data from  file

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    if (req.method === "GET" ) {
        let result = JSON.stringify(fileObj);
          res.end(result);
    }
    if (req.method === "POST") {
        console.log('post');
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
                console.log('Add success data was updated');
            });
            res.end()
        });
    }

    if (req.method === "DELETE") {
        req.on('data', function(data){
            let id = JSON.parse(data);
            //remove item
            for(let key in fileObj) {
                if (key == id) {
                 delete fileObj[key];
                }
            }
            //rewrite file
            let result = JSON.stringify(fileObj);
            fs.writeFileSync('countries.json', result, 'utf8',function(err) {
                if (err) throw err;
                console.log('Delete success data was updated');
            });
        });//req.on

        //read file without item
        var n = null;
        fs.readFile('countries.json', function (err, data) {
            if(err) {
                throw err;
            }
            n = JSON.parse(data);
         procesFile();
        });

        function procesFile () {
            return n
        }

        res.end(n);

        //console.log(file);
       // console.log(n);
        res.end('new object');
    }
    res.end('Hello World\n')


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});