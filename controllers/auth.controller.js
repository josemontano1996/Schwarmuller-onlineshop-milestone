const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

async function postSignUp(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signUp();

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserwithSameEmail();
  //if the user doesnt exist, return and dont execute more code
  if (!existingUser) {
    console.log("User not found");
    res.redirect("/login");
    return;
  }

  //checking if password is equal to the user hashed password
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    console.log("Password incorrect");
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  postSignUp: postSignUp,
  login: login,
};
