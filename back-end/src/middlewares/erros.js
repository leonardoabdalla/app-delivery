const errorCodes = {
  ValidationError: 400,
  UnauthorizedError: 401,
  NotFoundError: 404,
  ConflictError: 409,
};

const errors = (err, _req, res, _next) => {
  const { name, message } = err;
  const code = errorCodes[name] ?? 500;
  
  if (code === 500) console.log(err);
  
  res.status(code).json({ message });
};

module.exports = errors;
