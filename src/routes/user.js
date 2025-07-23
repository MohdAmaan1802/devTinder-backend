const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("formUserId", USER_SAFE_DATA);
    //.populate("formUserId", ["firstName", "lastName"])
    res.status(200).json({
      message: "Connection requests fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(400).json({ message: "Internal server error" });
  }
});

// Get all the sent connection requests by the loggedIn use
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { formUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("formUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.formUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.formUserId;
    });
    res.status(200).json({
      message: "User connections fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching user connections:", error);
    res.status(400).json({ message: "Internal server error" });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //user should see all the users cards except
    //hisown card
    // his connections
    // already sent connection requests
    // ignored people
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ formUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select(" formUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.formUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_SAFE_DATA);

    res.json({ data: users });
  } catch (error) {
    console.error("Error fetching user feed:", error);
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = userRouter;
