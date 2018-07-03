const jwt = require('jsonwebtoken');
module.exports = class Jwt {

  static verifyJwt(req, res) {
    let token = req.headers['x-access-token'];
    if(!token) {
      res.status(401).send({ success: false, message: 'No token provided.' });
      return false;
    }

    jwt.verify(token, 'superSecretPass', (err, decoded) => {
      if(err) {
        res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
        return false;
      }
    });
    return true;
  }

  static generateJwt(userId) {
    return jwt.sign({ userId }, 'superSecretPass', { expiresIn: 86400 });
  }

}
