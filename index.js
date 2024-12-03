const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
dotenv.config();
const port = 8080;
const useRouter = require("./Route/userRouter");
const postRouter = require("./Route/postRouter");
const commentRouter = require("./Route/commentRouter");
const likeRouter = require("./Route/likeRouter");
const i = async () => {
  const a = await mongoose.connect(process.env.MONGODB_URI);
};
i();
app.use(useRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(likeRouter);
app.listen(port, console.log(`runnig on ${port}`));
