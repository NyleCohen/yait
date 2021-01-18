import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const connectDB = require("./config/db");
const Org = require("./model/createOrg");
const Issue = require("./model/createIssue");

const app: express.Application = express();
const port: number = 8080;

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

const orgUuid = uuidv4();

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});

app.post("/createOrg", async (req, res) => {
  const org = new Org({
    org_id: orgUuid,
    name: req.body.orgname,
    admin_emails: req.body.admin_email,
  });

  org
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });

  res.status(200);
  res.redirect(`/org/${orgUuid}`);
});

app.get("/org/:orgId", async (req, res) => {
  const orgId = await Org.findOne({ org_id: req.params.orgId });
  if (orgId == null) return res.sendStatus(404);

  res.sendFile(path.join(`${__dirname}/views/org.html`));
  // res.json(await Org.findOne({ org_id: req.params.orgId }));
});

app.get("/org/:orgId/orgMeta", async (req, res) => {
  const orgId = await Org.findOne({ org_id: req.params.orgId });
  if (orgId == null) return res.sendStatus(404);

  res.json(await Org.findOne({ org_id: req.params.orgId }));
});

app.get("/org/:orgId/createIssue", async (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/createissue.html`));
});

app.post("/org/:orgId/createIssue", async (req, res) => {
  const urlOrgId = req.originalUrl.split("/");

  const issue = new Issue({
    id: uuidv4(),
    org_id: urlOrgId[2],
    title: req.body.title,
    description: req.body.description,
  });

  issue
    .save()
    .then((result: String) => {
      console.log(result);
    })
    .catch((err: String) => {
      console.log(err);
      res.send(500);
    });

  res.status(200);
});

app.get("/org/:orgId/issues", async (req, res) => {
  const urlOrgId = req.originalUrl.split("/");
  const issues = await Issue.find({ org_id: urlOrgId[2] }).where("id != 0");

  res.json(issues);
});

app.get("/org/:orgId/issue/:issueId", async (req, res) => {
  const urlOrgId = req.originalUrl.split("/")[2];
  const urlIssueId = req.originalUrl.split("/")[4];

  const issue = await Issue.find({ org_id: urlOrgId, id: urlIssueId });

  res.json(issue);
});

app.listen(port, () => {
  console.log("Online on port", port);
});
