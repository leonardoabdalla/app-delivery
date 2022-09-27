const Joi = require('joi');
const crypto = require('crypto');
const { User } = require('../database/models');
const jwt = require('../middlewares/jwt');

const authService = {
  validateBody: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    });

    const { error, value } = schema.validate(data);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }
    
    return value;
  },

  login: async (email, userPassword) => {
    const user = await User.findOne({ where: { email } });
    const hashed = crypto.createHash('md5').update(userPassword).digest('hex');

    if (!user || user.password !== hashed) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }

    const { password, ...userWithoutPassword } = user.dataValues;

    return userWithoutPassword;
  },

  validateToken: (token) => {
    const data = jwt.validateToken(token);

    return data;
  },
};

module.exports = authService;
