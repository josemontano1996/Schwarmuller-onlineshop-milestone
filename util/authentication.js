function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); // available because of the express-session package
  req.session.save(action); //this makes that the action is executed once the session is saved and stored
}

module.exports = {
  createUserSession: createUserSession,
};
