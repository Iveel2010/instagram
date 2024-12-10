const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    description: { type: String, required: true },
    postImage: [{ type: String, required: true }],
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "likes" }],
  },
  {
    timestamps: true,
  }
);
const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
