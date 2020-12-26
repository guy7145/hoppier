import express from 'express';
import cors from 'cors';
import hopsList from './data/hops';
const app = express();

app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.get('/data/all-hops', function (req, res) {
    console.log(`sending data... (${Object.keys(hopsList).length} different hops)`);
    res.json(hopsList);
});

app.get('/data/hop/:hopName', function (req, res) {
    res.json(hopsList[req.params.hopName]);
});

app.use(express.static('../client/dist/'))

const port = 8080;
console.log(`listening on port ${port}`);
app.listen(port);
