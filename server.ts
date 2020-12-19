import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";

const connectDB = require("./config/db");
const Org = require("./model/createOrg");

const app: express.Application = express();
const port: number = 8080;

require("./routes/orgRoutes")(app);

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.post("/createIssue", async (req, res) => {
  res.send(req.body);
});

app.get("/org/:orgId", async (req, res) => {
  const orgId = await Org.findOne({ org_id: req.params.orgId });
  if (orgId == null) return res.sendStatus(404);

  res.sendFile(path.join(__dirname + "/views/org.html"));
});

app.listen(port, () => {
  console.log("Online on port", port);
});
