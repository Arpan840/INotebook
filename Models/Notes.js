const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Notes = new mongoose.model("Notes", notesSchema);

Notes.collection.createIndex({ user: 1 });

module.exports = Notes;
