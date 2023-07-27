const allLoggedInUsers = (req, res, next) => {
  if (req.user) {
  }
  next();
};

module.exports = allLoggedInUsers;
