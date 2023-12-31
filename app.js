require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");

var app = express();
var db = require("./models");
db.sequelize.sync({ force: false });

app.use(
  session({
    secret: "Your Secret Key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var indexRouter = require("./routes/index");
var vehiclesRouter = require("./routes/vehicles");
var coloursRouter = require("./routes/colours");
var typesRouter = require("./routes/types");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/colours", coloursRouter);
app.use("/types", typesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
