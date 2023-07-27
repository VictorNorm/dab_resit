const onlyAdminUsers = (req, res, next) => {
  if (req.user) {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not Authorized. Admin role is required." });
    }
  } else {
    return res.status(401).json({ error: "Not authenticated." });
  }
  next();
};

module.exports = onlyAdminUsers;
