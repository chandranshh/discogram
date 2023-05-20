const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Messages = require("../models/Messages");
const Convo = require("../models/Convo");
const Users = require("../models/Users");

//conversation api
const jwt_secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConvo = new Convo({
      members: [senderId, receiverId],
    });
    await newConvo.save();
    res.status(200).json("Convo created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const convos = await Convo.find({
      members: {
        $in: [userId],
      },
    });
    const convoUserData = Promise.all(
      convos.map(async (convo) => {
        const receiverId = await convo.members.find(
          (member) => member !== userId
        );
        const user = await Users.findById(receiverId);
        return {
          user: {
            username: user.username,
            fullName: user.fullName,
            userId: user._id,
          },
          conversationId: convo._id,
        };
      })
    );
    res.status(200).json(await convoUserData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
