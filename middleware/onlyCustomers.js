const onlyCustomers = (req, res, next) => {
  if (req.user) {
    if (req.user.role != "customer") {
      return res
        .status(403)
        .json({ error: "Only customers can access this route" });
    }
  } else {
    return res.status(401).json({ error: "Not authenticated." });
  }
  next();
};

module.exports = onlyCustomers;
