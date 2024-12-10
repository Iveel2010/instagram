const Route = require("express");
const { commentModel } = require("../model/commentSchema");
const { postModel } = require("../model/postSchema");

const commentRouter = Route();

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

commentRouter.get("/getComment/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId, "hahahahahahah");
  try {
    // const response = await postModel.findById(postId, "comments");
    const comment = await postModel.findById(postId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "userName profileImage",
      },
    });
    res.send(comment);
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});

module.exports = commentRouter;
