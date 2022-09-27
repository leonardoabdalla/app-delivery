const jwt = require('jsonwebtoken');
const fs = require('fs');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const jwtService = {
  createToken: (user) => {
    const { password, ...userWOPassword } = user;
    const token = jwt.sign(userWOPassword, JWT_SECRET);
    return token;
  },

  decodeToken: (req, _res, next) => {
    const { authorization } = req.headers;
    req.user = {};

    try {
      const user = jwt.verify(authorization, JWT_SECRET);
      req.user = user;
    } catch {}

    next();
  },

  // roles = ['customer', 'seller', 'administrator']
  validateToken: (roles = []) => (req, _res, next) => {
    if (!Object.keys(req.user).length) {
      const erro = new Error('Expired or invalid token');
      erro.name = 'UnauthorizedError';
      throw erro;
    }

    if (roles.length && !roles.includes(req.user.role)) {
      const error = new Error(`Endpoint only available for roles: ${roles.join(', ')}`);
      error.name = 'UnauthorizedError';
      throw error; 
    }

    next();
  },
};

module.exports = jwtService;