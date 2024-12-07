const Route = require("express");
const postRouter = Route();
const { postModel } = require("../model/postSchema");
const { userModel } = require("../model/userSchema");

postRouter.post("/createPost", async (req, res) => {
  const { description, postImage, user, proFileImage, userName } = req.body;
  try {
    const newPost = await postModel.create({
      description,
      postImage,
      proFileImage,
      userName,
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

postRouter.get("/post", async (req, res) => {
  try {
    const post = await postModel.find();
    res.send(post);
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});

module.exports = postRouter;
