const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const cookieParser = require("cookie-parser");

authRouter.use(cookieParser());
authRouter.use(express.json());

authRouter.post("/signup", async (req, res) => {
  try {
    //validate the signup data
    validateSignUpData(req);

    //encrpt passsword
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    //find the user by email
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    //compare the password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //generate a JWT token
      const token = await user.getJWT();
      //add token to cookies and send response back to the user/client
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send("Error logging in" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout successful");
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).send("Error logging out" + err.message);
  }
});

module.exports = authRouter;
