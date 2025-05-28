const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mohdamaan1802:OSMTQN9ws6ECxzV5@nodelearning.qxuyhm1.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
