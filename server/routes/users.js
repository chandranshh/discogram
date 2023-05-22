const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Users = require("../models/Users");

//fetech all users from db

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(
      users.map((user) => ({
        fullName: user.fullName,
        username: user.username,
        _id: user._id,
      }))
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
