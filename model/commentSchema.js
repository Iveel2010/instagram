const { Schema, mongoose } = require("mongoose");
const { type } = require("os");

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "comment" },
    comment: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: "comment" },
  },
  {
    timestamps: true,
  }
);
const commentModel = mongoose.model("comment", commentSchema);

module.exports = { commentModel };
