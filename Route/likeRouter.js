const Route = require("express");
const likeRouter = Route();
const { postModel } = require("../model/postSchema");
const { likeModel } = require("../model/likeSchema");

likeRouter.post("/like", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const newlike = await likeModel.create({
      userId,
      postId,
    });
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });

    res.send("hihi");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
likeRouter.post("/unLike", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    await postModel.findByIdAndUpdate(postId, {
      $pull: {
        likes: userId,
      },
    });

    res.send("hihi");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
module.exports = likeRouter;
