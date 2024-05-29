const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  let users = await userModel.find();
  res.render("index", { users});
});

app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

app.post("/update/:userid", async (req, res) => {
  let { image, name, email } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { image, name, email },
    { new: true }
  );
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/");
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;

  let createUser = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/");
});

app.listen(3000);
