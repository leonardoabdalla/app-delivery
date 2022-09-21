const jwt = require('../middlewares/jwt');
const authService = require('../services/authService');

const authController = {
  login: async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    const token = await jwt.createToken({ email, password });
    const { name, role } = await authService.login(email, password);

    res.status(200).json({ name, email, role, token });
  },
};

 module.exports = authController;