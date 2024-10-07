const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const jwt_SECRET = "secret_jwt_token";
mongoose.connect("mongodb://127.0.0.1:27017/levon");

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  pass: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  jwt.verify(token, jwt_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valzid" });
    }
    req.user = user;
    next();
  });
};

app.post("/signup", async (req, res) => {
  const { email, pass } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = await bcrypt.hash(pass, 10);
  const user = new User({ email, pass: hashedPass });
  await user.save();

  res.json({ message: "Signup successful" });
});

app.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(pass, user.pass);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email: email }, jwt_SECRET, { expiresIn: "1h" });
  return res
    .status(200)
    .json({ message: "login successfull", status: true, user: user, token });
});

app.get("/home", authenticateToken, (req, res) => {
  res.send("User has a valid JWT token");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
