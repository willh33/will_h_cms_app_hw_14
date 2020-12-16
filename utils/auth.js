const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Checks if a user logged into the sessin yet, if so, carry on, if not redirect to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
