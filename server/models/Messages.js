const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema(
  {
    senderId: {
      type: String,
    },
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;
