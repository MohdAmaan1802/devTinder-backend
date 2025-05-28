const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    emailId: "johndoe123@gmail.com",
    password: "johndoe123",
  });
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving user");
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
