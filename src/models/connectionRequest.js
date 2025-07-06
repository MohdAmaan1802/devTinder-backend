const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    formUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "accpeted", "rejected", "interested"],
        message: "{VALUE} is not a valid status",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ formUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.formUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
