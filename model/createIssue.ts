import mongoose from "mongoose";

const issueSchema: mongoose.Schema = new mongoose.Schema({
  id: {
    type: Number,
    //required: true,
  },
  org_id: {
    type: String,
    //required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Issue", issueSchema, "org");
