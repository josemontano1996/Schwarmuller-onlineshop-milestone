function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    console.log("Fail to add session");
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

module.exports = checkAuthStatus;
