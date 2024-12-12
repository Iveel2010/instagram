const Route = require("express");
const postRouter = Route();
const { postModel } = require("../model/postSchema");
const { userModel } = require("../model/userSchema");
const tokenMiddleWare = require("../Controllers/tokenMiddleware");

postRouter.post("/createPost", async (req, res) => {
  const { description, postImage, user, proFileImage, userName } = req.body;
  try {
    const newPost = await postModel.create({
      description,
      postImage,
      proFileImage,
      user,
    });
    await userModel.findByIdAndUpdate(user, {
      $push: {
        post: newPost._id,
      },
    });
    res.send(newPost);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

postRouter.get("/post", tokenMiddleWare, async (req, res) => {
  try {
    const users = await postModel
      .find()
      .populate("user", "userName profileImage");
    res.send(users);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = postRouter;
