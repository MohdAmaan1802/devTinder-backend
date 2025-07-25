const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    //verify the token
    const decodedData = await jwt.verify(token, "DEV@Tinder$1802");
    const { _id } = decodedData;
    //find the user by id
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error in authentication: " + err.message);
  }
};

module.exports = { userAuth };
