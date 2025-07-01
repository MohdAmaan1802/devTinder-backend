const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const { token } = cookies;
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }

    res.send(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).send("Error fetching profile" + err.message);
  }
});

module.exports = profileRouter;
