import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from "body-parser";

import { v4 as uuidv4 } from "uuid";

const app: express.Application = express();
const Org = require("../model/createOrg");

function orgRoutes() {
  app.post("/createOrg", async (req, res) => {
    const orgUuid = uuidv4();

    const org = new Org({
      org_id: orgUuid,
      name: req.body.orgname,
      admin_emails: req.body.admin_emails,
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
    res.redirect("/org/" + orgUuid);
  });
}

module.exports = orgRoutes();
