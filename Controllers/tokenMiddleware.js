const jwt = require("jsonwebtoken");
const tokenMiddleWare = (req, res, next) => {
  const head = req.headers["authorization"];
  const token = head.split(" ")[1];

  const token2 = jwt.verify(token, process.env.HOOK_HIDDEN_CODE);
  if (token2) {
    next();
  } else {
    res.send("err");
  }
};

module.exports = tokenMiddleWare;
