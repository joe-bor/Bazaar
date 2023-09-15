const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // Check for the token and if it exists
  let token = req.body.token
  if (token) {
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      req.user = err ? null : decoded.user
      req.exp = err ? null : new Date(decoded.exp * 1000)
    })
    return next()
  } else {
    return next()
  }
}