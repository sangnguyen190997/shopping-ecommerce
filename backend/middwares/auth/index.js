const { verifyToken } = require("../../services/auth");
const { getUserByEmail, getUserById } = require("../../services/users");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      const data = await verifyToken(accessToken);
      const user = await getUserById(data.id);

      if (!user) {
        return res.status(403).send("Token is not valid");
      }
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).send("You're not authenticated");
  }
};

const verifyTokenandAdmin = (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  if (user.id === id || user.admin) {
    next();
  } else {
    res.status(403).send("You're not allowed to delete others");
  }
};

module.exports = {
  authenticate,
  verifyTokenandAdmin,
};
