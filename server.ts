import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const connectDB = require('./config/db');
const Org = require('./model/createOrg');

const app: express.Application = express();
const port: number = 8080;

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.post('/createOrg', async (req, res) => {
    const org = new Org({ 
        name: req.body.orgname
    });

    org
        .save()
        .then( (result: any) => {
            console.log(result);
        })
        .catch((err: any) => console.log(err));

    res.status(200);
    res.redirect('/');
});

app.post('/createIssue', async (req, res) => {
    console.log(req.body);
})

app.listen(port, () => {
    console.log("Online on port", port);
});
