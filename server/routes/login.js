const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

//import schema
const Users = require("../models/Users");

//register api
const jwt_secret = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  console.log("Login api is working");
  const { username, password } = req.body;
  console.log(username, password);

  const user = await Users.findOne({ username });
  if (!user) {
    res.status(500).json("Username does not exist");
  } else {
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (passwordCheck) {
      jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        jwt_secret,
        { expiresIn: 84600 },
        async (error, token) => {
          if (error) {
            throw error;
          } else {
            await Users.updateOne(
              { _id: user._id },
              {
                $set: { token: token },
              }
            );
            res.cookie("token", token).status(200).json({
              userId: user._id,
              username: user.username,
              token: token,
            });
          }
        }
      );
    } else {
      res.status(500).json("Incorrect password");
    }
  }
});

module.exports = router;

// const { username, password } = req.body;
// const user = Users.findOne({ username });
// const passwordCheck = bcrypt.compareSync(password, user.password);

// console.log(username, password);

// if (passwordCheck) {
//   jwt.sign(
//     {
//       userId: user._id,
//       username: user.username,
//     },
//     jwt_secret,
//     {},
//     (error, token) => {
//       if (error) {
//         throw error;
//       } else {
//         res.cookie("token", token).status(200).json({
//           userId: user._id,
//           username: user.username,
//         });
//       }
//     }
//   );
// } else {
//   res.status(500).json("Password is incorrect");
// }
