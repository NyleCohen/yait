import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import { v4 as uuidv4 }from 'uuid';

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
    const orgUuid: string = uuidv4();

    const org = new Org({ 
        org_id: orgUuid,
        name: req.body.orgname,
        admin_emails: req.body.admin_emails 
    });

    org
        .save()
        .then( (result: any) => {
            console.log(result);
        })
        .catch((err: any) => {
            console.log(err);
            res.send(500);
        })

    res.status(200);
    res.redirect('/org?orgId=' + orgUuid);
});

app.post('/createIssue', async (req, res) => {
    res.send(req.body);
});

app.get('/org/:orgId', async (req, res) => {
    const orgId = await Org.findOne({ org_id: req.params.orgId });
    if(orgId == null) return res.sendStatus(404);

    res.sendFile(path.join(__dirname + '/views/org.html'))
});

app.listen(port, () => {
    console.log("Online on port", port);
});
