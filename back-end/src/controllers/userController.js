const crypto = require('crypto');
const userService = require('../services/userService');
const jwt = require('../middlewares/jwt');

const userController = {
  createUser: async (req, res) => {
    const { name, email, password, role } = userService.validateCreateUser(req.body);
    const hashed = crypto.createHash('md5').update(password).digest('hex');

    const user = await userService.createUser({
      name,
      email,
      password: hashed,
      role,
    });

    const token = jwt.createToken(user);

    res.status(201).json({ name, email, role, token });
  },

  getAll: async (req, res) => {
    const getAll = await userService.getAll();
    res.status(200).json(getAll);
  },

};

module.exports = userController;