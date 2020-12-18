import express from 'express';
import path from 'path';

const connectDB = require('./config/db');
const createOrg = require('./model/createOrg')

const app: express.Application = express();
const port: number = 8080;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/createOrg', async (req, res) => {
    res.json({ orgName: req.body })
    //createOrg(req.body.orgName);
    //res.redirect('/');
});


app.listen(port, function() {
    console.log("Online on port", port);
});
