const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Messages = require("../models/Messages");

//messageAPI
const jwt_secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const { senderId, conversationId, text } = req.body;
    const newMessage = new Messages({
      senderId,
      conversationId,
      text: text,
    });
    await newMessage.save();
    res.status(200).json("Message sent successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
