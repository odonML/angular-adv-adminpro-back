const express = require('express');
const { dbConection } = require('./src/database/config');
require('dotenv').config();
const cors = require('cors');
const usuarioRouter = require('./src/router/usuarios.router');
const authRouter = require('./src/router/auth.router');

const app = express();
app.use(cors());
app.use(express.json());

dbConection();

app.use('/api/usuarios', usuarioRouter);
app.use('/api/login', authRouter);

app.listen(process.env.PORT, () => {
	console.log('server in port' + process.env.PORT);
});
