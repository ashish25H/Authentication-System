require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const User = require("./model/user"); //import user

const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json()); //middle ware express can not handle json files that's why we need middleware

app.get("/", (req, res) => {
  res.send(`<h1>Hello from auth system</h1>`);
});

//sending data
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All fields are Required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(401).send("User already exists");
    }

    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    //token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    //update or not

    user.password = undefined;
    
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
