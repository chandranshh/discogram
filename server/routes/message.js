const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Messages = require("../models/Messages");
const Users = require("../models/Users");
const Convo = require("../models/Convo");

//messageAPI
router.post("/", async (req, res) => {
  try {
    const { senderId, conversationId, text, receiverId = "" } = req.body;
    if (!senderId || !text)
      return res.status(500).json("Please enter all fields");

    if (conversationId === "new" && receiverId) {
      // Check if conversation already exists
      const existingConvo = await Convo.findOne({
        members: { $all: [senderId, receiverId] },
      });

      let conversation;
      if (existingConvo) {
        conversation = existingConvo;
      } else {
        // Create a new conversation
        const newConvo = new Convo({
          members: [senderId, receiverId],
        });
        conversation = await newConvo.save();
      }

      const newMessage = new Messages({
        conversationId: conversation._id,
        senderId,
        text: text,
      });
      await newMessage.save();
      res.status(200).json("Message sent successfully");
    } else if (conversationId !== "new" && text) {
      const newMessage = new Messages({
        senderId,
        conversationId,
        text: text,
      });
      await newMessage.save();
      res.status(200).json("Message sent successfully");
    } else {
      res.status(500).json("Please enter all fields");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if (conversationId === "new") return res.status(200).json([]);
    const messages = await Messages.find({
      conversationId: conversationId,
    });
    const messageUserData = Promise.all(
      messages.map(async (message) => {
        const user = await Users.findById(message.senderId);
        return {
          user: {
            username: user.username,
            fullName: user.fullName,
            userId: user._id,
          },
          text: message.text,
        };
      })
    );
    res.status(200).json(await messageUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
