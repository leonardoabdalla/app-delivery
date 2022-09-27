const express = require('express');
const cors = require('cors');
require('express-async-errors');
const errors = require('../middlewares/erros');
const { decodeToken } = require('../middlewares/jwt');
const authRouter = require('../routers/authRouter');
const userRouter = require('../routers/userRouter');
const productsRouter = require('../routers/productsRouter');
const salesRouter = require('../routers/salesRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use('/login', authRouter);
app.use('/users', decodeToken, userRouter);
app.use('/products', decodeToken, productsRouter);
app.use('/sales', decodeToken, salesRouter);

app.use(errors);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
