const express = require('express');
const data = require('./data');
const cors = require('cors');
const app = express();

app.use(cors());

app.all('/', function (req, res) {
    res.send('hi there');
});

app.get('/data', function (req, res) {
    console.log(`sending data... (${Object.keys(data).length} different hops)`);
    res.json(data);
});

app.get('/data/:hopName', function (req, res) {
    res.json(data[req.params.hopName]);
});

const port = 1234;
console.log(`listening on port ${port}`);
app.listen(port);
