const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

// CORS setup
const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST"], // Allow GET and POST methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow credentials like cookies
};

app.options("*", cors(corsOptions)); // Add this line before routes

app.use(cors(corsOptions)); // Use CORS middleware before routes

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contentRouter = require("./routes/content");
const past_examsRouter = require("./routes/past_exams.js");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", contentRouter);
app.use("/past_exam", past_examsRouter);

// View engine setup (if you're using it, otherwise remove this)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
