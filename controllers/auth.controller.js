function getSignUp(req, res) {
  res.render("customer/auth/signup");
}

function postSignUp(req, res) {
  
}

function getLogin(req, res) {}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  postSignUp: postSignUp,
};
