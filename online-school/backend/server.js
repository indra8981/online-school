const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const withAuth = require("./middleware.js");
const User = require("./models/user.model");

require("dotenv").config();
const secret = process.env.SECRET_JWT;

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.post("/api/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(400).json({
        error: "Incorrect email or password",
      });
    } else {
      if (user.password !== password) {
        res.status(400).json({
          error: "Incorrect email or password",
        });
      } else {
        // Issue token
        const payload = { type: user.userType, email: email };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: false }).sendStatus(200);
      }
    }
  });
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
app.use("/uploads", express.static("uploads"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const classRoomsRouter = require("./routes/classrooms");
app.use("/classrooms", classRoomsRouter);
const assignmentRouter = require("./routes/assignment");
app.use("/assignment", assignmentRouter);

app.get("/checkToken", withAuth, function (req, res) {
  res.status(200).json({ email: res.email, type: res.type });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
