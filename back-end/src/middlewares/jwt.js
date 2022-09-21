const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret_key'; // fs.readFileSync('../../jwt.evaluation.key', { encoding: 'utf-8' });

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, JWT_SECRET);
    return token;
  },

  validateToken: (req, _res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      const erro = new Error('Token not found');
      erro.name = 'UnauthorizedError';
      throw erro;
    }
    try {
      const temp = jwt.verify(authorization, JWT_SECRET);
      console.log(temp);
      req.userId = temp.data.id;
    } catch (e) {
      const error = new Error('Expired or invalid token');
      error.name = 'UnauthorizedError';
      throw error; 
    }
    next();
  },
};

module.exports = jwtService;