const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ConvoSchema = mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Convo = mongoose.model("Convo", ConvoSchema);

module.exports = Convo;
