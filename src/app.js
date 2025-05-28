const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  //creating a new instance of the user model
  const user = new User(req.body);
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
