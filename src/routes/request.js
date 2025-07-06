const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { findOne } = require("../models/user");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const formUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatuses = ["ignored", "interested"];
      if (!allowedStatuses.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      // Check if the user exists with the given toUserId
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res
          .status(404)
          .json({ message: "User not found with the given ID" });
      }

      //  Check if the connection request already exists
      const excitingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { formUserId, toUserId },
          { formUserId: toUserId, toUserId: formUserId },
        ],
      });
      if (excitingConnectionRequest) {
        return res.status(400).json({
          message: "Connection request already exists between these users",
        });
      }

      const connectionRequest = new ConnectionRequest({
        formUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      if (!data) {
        return res.status(400).send("Error sending connection request");
      }
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      console.error("Error sending connection request:", err);
      res.status(500).send("Error sending connection request" + err.message);
    }
  }
);

module.exports = requestRouter;
