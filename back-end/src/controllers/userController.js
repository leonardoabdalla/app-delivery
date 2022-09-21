const userService = require('../services/userService');

const userController = {
  createUser: async (req, res) => {
    const { email, password } = userService.validateBody(req.body);
    const user = await userService.createUser({ email, password });

    res.status(201).json({ token: user });
  },
};

module.exports = userController;