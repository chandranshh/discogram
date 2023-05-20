const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
