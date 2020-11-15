import express from 'express';
import cors from 'cors';
import hopsList from './data/hops';
const app = express();

app.use(cors());

app.get('/data/all-hops', function (req, res) {
    console.log(`sending data... (${Object.keys(hopsList).length} different hops)`);
    res.json(hopsList);
});

app.get('/data/hop/:hopName', function (req, res) {
    res.json(hopsList[req.params.hopName]);
});

app.get('/data/mst', function (req, res) {

});

const port = 5000;
console.log(`listening on port ${port}`);
app.listen(port);
