const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    description: { type: String, required: true },
    postImage: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "likes" }],
  },
  {
    timestamps: true,
  }
);
const postModel = mongoose.model("post", postSchema);

module.exports = { postModel };
