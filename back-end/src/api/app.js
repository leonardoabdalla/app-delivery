const express = require('express');
const cors = require('cors');
require('express-async-errors');
const errors = require('../middlewares/erros');
const authRouter = require('../routers/authRouter');
const userRouter = require('../routers/userRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRouter);
app.use('/users', userRouter);

app.use(errors);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
