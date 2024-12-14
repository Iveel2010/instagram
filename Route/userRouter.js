const Route = require("express");
const userRouter = Route();
const { userModel } = require("../model/userSchema");
const tokenMiddleWare = require("../Controllers/tokenMiddleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", tokenMiddleWare, async (req, res) => {
  const { userName, password, email, profileImage } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      userName,
      password: hashedPassword,
      email,
      profileImage,
    });
    const token = jwt.sign({ userId: user._id }, process.env.HOOK_HIDDEN_CODE, {
      expiresIn: "24h",
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

userRouter.post("/login", tokenMiddleWare, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.send("err2");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send("err3");
    }
    const token = jwt.sign({ userId: user._id }, process.env.HOOK_HIDDEN_CODE, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.send(error);
  }
});

module.exports = userRouter;
