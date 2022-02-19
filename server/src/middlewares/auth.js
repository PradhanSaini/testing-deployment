const { verify } = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const accessToken = req.body.header;
  if (!accessToken) return res.json({ message: "User not logged in....." });
  // console.log("In Auth",accessToken,"OUt of Auth");
  console.log(req.body);
  try {
    const validToken = verify(accessToken, "Ram");
    req.user = validToken;
    // console.log("in auth" , validToken);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = Auth;
