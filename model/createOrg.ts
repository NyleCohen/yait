import mongoose from "mongoose";

const orgSchema: mongoose.Schema = new mongoose.Schema({
  org_id: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  admin_emails: {
    type: Array,
    required: true,
  },
  user_emails: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("Org", orgSchema, "org");
