const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //Typically token structure is: word token. e.g: Bearer safhaskjfnasjkfdnasjkdfa
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (error) {
    res.status(401).json({message: "Auth failed!"});
  }

}
