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
    const newPopulatedLike = await likeModel.findById(userId).populate({
      path: "likes",
      populate: {
        path: "userId",
        select: "userName profileImage",
      },
    });
    res.send(comment);
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: newPopulatedLike,
      },
    });
    res.send("hihi");
  } catch (error) {
    res.send({ error });
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
    res.send({ error });
    console.log(error);
  }
});
module.exports = likeRouter;
