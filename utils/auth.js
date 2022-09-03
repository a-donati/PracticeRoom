// module.exports = {
//   ensureAuth: function (req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     } else {
//       // if not authenticated, redirect to homepage 
//       res.redirect('/')
//     }
//   },
//   ensureGuest: function (req, res, next) {
//     if (!req.isAuthenticated()) {
//       res.redirect('/');
//     } else {
//       return next();
//     }
//   },
// }

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

module.exports = withAuth;
