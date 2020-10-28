// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const { json } = require("body-parser");
const logs = require('./logs.json');

// Initialize express and define a port
const app = express();
const PORT = 3004;

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());

app.get('/', (req, res) => {

    // Create initial object
    // const objArray = {};
    // const timestamp = new Date();
    // const obj = { dateTime: timestamp.toGMTString(), data: {} };
    // objArray['data'] = [];
    // objArray.data.push(obj);
    // storeData(JSON.stringify(objArray), 'logs.json');
    res.send('Hello World!').end();
});

app.post("/hook", (req, res) => {

    // Read file and write to json 
    try {
        // console.log(req.body) // Call your action on the request here

        const dataObj = JSON.parse(logs);
        const timestamp = new Date();
        const obj = { dateTime: timestamp.toGMTString(), data: req.body };
        dataObj.data.push(obj);
        // console.log(dataObj);

        const file = JSON.stringify(dataObj);

        storeData( file, 'logs.json');
        res.status(200).end() // Responding is important
    } catch (err) {
        console.log('Read file error');
        console.log(err);
        res.status(500).end() // Responding is important
    }

});

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
        console.log('Write to file error');
    }
}
