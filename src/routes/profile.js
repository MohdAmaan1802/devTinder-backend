const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid fields in profile edit request");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName},your profile update successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    console.error("Error validating profile edit data:", err);
    return res.status(400).send("Invalid profile edit data: " + err.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    // Validate old password
    const isOldPasswordValid = await loggedInUser.validatePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    // Update password
    loggedInUser.password = newPassword;
    // Hash the new password
    console.log("New password:", loggedInUser.password);
    loggedInUser.password = await bcrypt.hash(newPassword, 12);
    console.log("New password:", loggedInUser.password);
    await loggedInUser.save();

    res.json({
      message: "Your password has been updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    console.error("Error updating password:", err);
    return res.status(400).send("Error updating password: " + err.message);
  }
});

module.exports = profileRouter;
