const Route = require("express");
const commentRouter = Route();
const { commentModel } = require("../model/commentSchema");
const { postModel } = require("../model/postSchema");
commentRouter.post("/comment", async (req, res) => {
  const { userId, comment, postId } = req.body;
  try {
    const newComment = await commentModel.create({
      comment,
      userId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comments: newComment._id,
      },
    });

    res.send("hihi");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
commentRouter.post("/unComment", async (req, res) => {
  const { userId, comment, postId } = req.body;
  try {
    const newComment = await commentModel.create({
      comment,
      userId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        comments: newComment._id,
      },
    });

    res.send("hihi");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
module.exports = commentRouter;
