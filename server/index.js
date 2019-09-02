const http = require('http');
const fs   = require('fs');
const url = require('url');
const hostname = '127.0.0.1';
const port = 3008;
const countries = require('./countries');

//console.log(countries);
var ID= function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};



const server = http.createServer((req, res) => {
    //get object data from  file

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT');
    if (req.method === "GET" ) {
        let fileObj = fs.readFileSync('countries.json', 'utf8');
          res.end(fileObj);
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

            //get file content
            let fileStr = fs.readFileSync('countries.json', 'utf8');
            let fileObj = JSON.parse(fileStr);

            //Merge object
               Object.assign(fileObj,countryObj);

            let result = JSON.stringify(fileObj);
            // write data tofile
            fs.writeFileSync('countries.json', result, 'utf8',function(err) {
                if (err) throw err;
                console.log('Add success data was updated');
            });
         });
    }

    if (req.method === "DELETE") {
        let parsedUrl = url.parse(req.url, true);
         let id = parsedUrl.query.id;

            let content = fs.readFileSync('countries.json', 'utf8');
            let contentObj = JSON.parse(content);

            //  //Remove item
            for (let key in contentObj) {
                if (key == id) {
                    delete contentObj[key];
                }
            }
            let result = JSON.stringify(contentObj);
        fs.writeFileSync('countries.json', result, 'utf8',function(err) {
            if (err) throw err;
            console.log('Add success data was updated');
        });

        let file    = fs.readFileSync('countries.json', 'utf8');
        let fileObj = JSON.stringify(file);
        res.end(fileObj);
    }

    if (req.method === "PUT") {
        req.on('data', (data) => {
            let dataObj = JSON.parse(data);

            //get file content
            let fileStr = fs.readFileSync('countries.json', 'utf8');
            let fileObj = JSON.parse(fileStr);

           for(let key in fileObj) {
               if (key == dataObj.id) {
                   fileObj[key].country = dataObj.value;
               }
           }

            let result = JSON.stringify(fileObj);
            // write data tofile
            fs.writeFileSync('countries.json', result, 'utf8',function(err) {
                if (err) throw err;
                console.log('Add success data was updated');
            });



        })
    }

    res.end('Hello World\n')


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});