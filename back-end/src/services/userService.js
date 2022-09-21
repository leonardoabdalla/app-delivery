const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('../middlewares/jwt');

const userService = {
  validateCreateUser: (body) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      role: Joi.string().valid('customer', 'seller', 'administrator').required(),
    });
    
    const { error, value } = schema.validate(body);

    if (error) throw error;

    return value;
  },

  createUser: async (body) => {
    await db.User.create(body);
    const { password: passwordOlder, ...userWithoutPassword } = body;
    const token = jwtService.createToken(userWithoutPassword);
    return token;
  },

};

module.exports = userService;
