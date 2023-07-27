var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    userService.getOneByName(username).then((data) => {
      if (data === null || data.password !== password) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      return cb(null, data);
    });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express", user: req.user });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "Express", user: req.user });
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      // handle error
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "There was an error logging out. Please try again.",
      });
    }
    // if no error, redirect to home page
    res.redirect("/");
  });
});

// router.post("/login/password", async function (req, res, next) {
//   const { username, password } = req.body;

//   let user = await userService.getOneByName(username);
//   console.log("||||||||||||||||||||||", user);

//   if (!user) {
//     console.log(`No user found with email: ${username}`);
//     return res.status(400).json({
//       status: "fail",
//       data: {
//         statuscode: 400,
//         result: "No user with that username",
//       },
//     });
//   }

//   if (!username || !password) {
//     return res.status(400).json({
//       status: "fail",
//       data: {
//         result: "Must provide email and password.",
//       },
//     });
//   }

//   if (password.toString() !== user.password.toString()) {
//     return res.status(400).json({
//       status: "fail",
//       data: {
//         Statuscode: 400,
//         result: "Incorrect password",
//       },
//     });
//   }

//   res.render("login", { title: "Express", user: user });
// });

router.post(
  "/login/password",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
