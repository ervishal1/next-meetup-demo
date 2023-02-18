import mongoose from "mongoose";

const MeetupSchema = new mongoose.Schema({
  title:{ type: String},
  image:{ type: String},
  address:{ type: String},
  description:{ type: String},
});

module.exports = mongoose.models.MeetupSchema || mongoose.model("Meetups", MeetupSchema);
