const jwt = require('../middlewares/jwt');
const authService = require('../services/authService');

const authController = {
  login: async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    const user = await authService.login(email, password);
    const token = jwt.createToken(user);
    const { name, role } = user;

    res.status(200).json({ name, email, role, token });
  },
};

 module.exports = authController;