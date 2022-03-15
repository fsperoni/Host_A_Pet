"use strict";

/** Express app for Host a Pet. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

// TODO - DEFINE ROUTES
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const petRoutes = require("./routes/pets");
const roleRoutes = require("./routes/roles");
const availRoutes = require("./routes/availabilities");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// TODO - DEFINE ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/roles", roleRoutes);
app.use("/availabilities", availRoutes);


// Handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
