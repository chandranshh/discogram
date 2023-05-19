const express = require("express");
const dotenv = require("dotenv");
const app = express();

//imports routes
const handleRegister = require("./routes/register");

//imports
require("./connection");

//imports files
const Users = require("./models/Users");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api test
app.get(`/`, (req, res) => {
  res.send("API is working");
});

//routes
app.use("/api/register", handleRegister);

//port listening
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
