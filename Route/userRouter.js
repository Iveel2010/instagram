const Route = require("express");
const userRouter = Route();
const { userModel } = require("../model/userSchema");
userRouter.post("/signup", async (req, res) => {
  const { userName, password, email, profileImage } = req.body;
  try {
    const newUser = await userModel.create({
      userName,
      password,
      email,
      profileImage,
    });
    res.send(newUser);
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
userRouter.get("/user", async (req, res) => {
  try {
    const users = await userModel
      .find()
      .populate("post", "description postImage");
    res.send(users);
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
userRouter.post("/follow", async (req, res) => {
  const { followerid, followingid } = req.body;
  if (followerid === followingid) {
    throw new error("gdfskbf");
  }
  try {
    await userModel.findByIdAndUpdate(followerid, {
      $addToSet: {
        following: followingid,
      },
    });
    await userModel.findByIdAndUpdate(followingid, {
      $addToSet: {
        followers: followerid,
      },
    });
    res.send("ok bro");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
userRouter.post("/unFollow", async (req, res) => {
  const { followerid, followingid } = req.body;
  if (followerid === followingid) {
    throw new error("gdfskbf");
  }
  try {
    await userModel.findByIdAndUpdate(followerid, {
      $pull: {
        following: followingid,
      },
    });
    await userModel.findByIdAndUpdate(followingid, {
      $pull: {
        followers: followerid,
      },
    });
    res.send("ok bro");
  } catch (error) {
    res.send("err");
    console.log(error);
  }
});
module.exports = userRouter;
