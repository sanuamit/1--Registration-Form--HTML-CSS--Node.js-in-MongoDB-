const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/registrationdb")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  newUser
    .save()
    .then((user) => {
      console.log("User registered:", user);
      res.send("User registered successfully!");
    })
    .catch((err) => {
      console.error("Error registering user:", err);
      res.status(500).send("Failed to register user. Please try again later.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
