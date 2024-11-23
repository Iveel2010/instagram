const { Schema, mongoose } = require("mongoose");

const likeSchema = new Schema(
  {
    postId: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);
const likeModel = mongoose.model("likes", likeSchema);

module.exports = { likeModel };
