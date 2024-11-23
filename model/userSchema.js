const { Schema, mongoose } = require("mongoose");
const { type } = require("os");

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
    post: [{ type: Schema.Types.ObjectId, ref: "post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "followers" }],
    following: [{ type: Schema.Types.ObjectId, ref: "following" }],
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
