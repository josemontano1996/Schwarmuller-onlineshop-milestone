const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignUp(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      password: "",
      fullname: "",
      street: "",
      postalcode: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
}

async function postSignUp(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postalcode: req.body.postal,
    city: req.body.city,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flahsDataToSession(
      req,
      {
        errorMessage: "Please check your input, invalid data",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const emailExistsAlready = await user.emailExistsAlready();

    if (emailExistsAlready) {
      sessionFlash.flahsDataToSession(
        req,
        {
          errorMessage: "User exists already",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );

      return;
    }

    await user.signUp();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserwithSameEmail();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    const sessionErrorData = {
      errorMessage: "Invalid credentials, please check email or password",
      email: user.email,
      password: user.password,
    };

    sessionFlash.flahsDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
    });
    return;
  }

  //checking if password is equal to the user hashed password
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flahsDataToSession(req, sessionErrorData, function () {
      res.redirect("/login");
      return;
    });
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  postSignUp: postSignUp,
  login: login,
  logout: logout,
};
