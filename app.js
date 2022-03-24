const express = require("express");
const Middleware = require("./middlewares/common");

const sequelize = require("sequelize");
require("dotenv").config();
const chalk = require("chalk");
const Response = require("./helpers/Response");
const DB = require("./config/config");
const passport = require("passport");
const cookieSession = require("cookie-session");

const userRoutes = require("./routes/user.js");
const attendanceRoutes = require("./routes/attendance.js");
const emailRoutes = require("./routes/email");

const port = process.env.PORT || 3000;

const app = express();
Middleware(app);

//Configure Session Storage
app.use(
  cookieSession({
    name: "session-name",
    keys: ["key1", "key2"],
  })
);

//Configure Passport
app.use(passport.initialize());
app.use(passport.session());

//REGISTER ROUTES HERE
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/email", emailRoutes);

app.get("/api", (req, res) => {
  const response = new Response(
    true,
    200,
    `Welcome to Node Auth Template Postgres ${port}`
  );
  res.status(response.code).json(response);
});

//Handling unhandle routes
app.all("*", (req, res, next) => {
  const response = new Response(
    false,
    404,
    `Page not found. Can't find ${req.originalUrl} on this server`
  );
  return res.status(response.code).json(response);
});

//listening to port
app.listen(port, () => {
  console.log(`Welcome to Node Auth Template Postgres running on port ${port}`);
});
