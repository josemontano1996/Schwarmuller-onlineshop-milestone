function createUserSession(req, user, action) {
  req.session.uid = user._id.toString(); // available because of the express-session package
  req.session.isAdmin = user.isAdmin;
  req.session.save(action); //this makes that the action is executed once the session is saved and stored
}

async function destroyUserAuthSession(req) {
  req.session.uid = null;
  await req.session.save();
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
