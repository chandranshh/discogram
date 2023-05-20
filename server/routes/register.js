const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Users = require("../models/Users");

//register api
const jwt_secret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

router.post("/", async (req, res) => {
  console.log("Register api is working");
  try {
    const { fullName, username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userExists = await Users.findOne({ username });
    if (userExists) {
      res.status(400).json("Username already taken or exist");
    } else {
      const createdUser = await Users.create({
        fullName: fullName,
        username: username,
        password: hashedPassword,
      });

      jwt.sign(
        {
          userId: createdUser._id,
          username: username,
        },
        jwt_secret,
        {},
        (error, token) => {
          if (error) {
            throw error;
          } else {
            createdUser.token = token;
            createdUser.save();
            res.cookie("token", token).status(200).json({
              userId: createdUser._id,
              username: username,
              token: createdUser.token,
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
