function isAdmin(req, res, next) {
  if (req.session['role'] !== 'Seller') {
    res.redirect('/login?error=You have no access!')
  } else {
    next()
  }
}

function isLogin(req, res, next) {
  if (!req.session['UserId']) {
    res.redirect('/login?error=Please login first!')
  } else {
    next()
  }
}

module.exports = {
  isLogin,
  isAdmin
}