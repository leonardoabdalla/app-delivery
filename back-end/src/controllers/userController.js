const crypto = require('crypto');
const userService = require('../services/userService');
const jwt = require('../middlewares/jwt');

const userController = {
  createUser: async (req, res) => {
    const { name, email, password, role } = userService.validateCreateUser(req.body);
    const hashed = crypto.createHash('md5').update(password).digest('hex');
    const token = await jwt.createToken({ email });

    const user = await userService.createUser({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({  user });
  },
};

module.exports = userController;