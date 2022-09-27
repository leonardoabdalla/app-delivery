const Joi = require('joi');
const db = require('../database/models');
// const jwtService = require('../middlewares/jwt');

const userService = {
  validateCreateUser: (body) => {
    const schema = Joi.object({
      name: Joi.string().required().min(12),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      role: Joi.string().valid('customer', 'seller', 'administrator'),
    });
    
    const { error, value } = schema.validate(body);

    if (error) throw error;

    return value;
  },

  createUser: async ({ name, email, password, role }) => {
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      const e = new Error('User already exists');
      e.name = 'ConflictError';
      throw e;
    }

    const newRole = role === undefined ? 'customer' : role;
    const newUser = await db.User.create({ name, email, password, role: newRole });
    const { password: passwordOlder, ...userWithoutPassword } = newUser.dataValues;
    return userWithoutPassword;
  },

  getByEmail: async (email) => {
    const userId = await db.User.findOne({ where: { email } });
    return userId;
  },

  getByName: async (name) => {
    const sellerId = await db.User.findOne({ where: { name } });
    return sellerId;
  },

  getAll: async () => {
    const users = await db.User.findAll();
    return users;
  },

};

module.exports = userService;
