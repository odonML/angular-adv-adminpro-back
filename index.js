const express = require('express');
const { dbConection } = require('./src/database/config');
require('dotenv').config();
const cors = require('cors');
// Rutas
const usuarioRouter = require('./src/router/usuarios.router');
const hospitalesRouter = require('./src/router/hospitales.router');
const medicosRouter = require('./src/router/medicos.router');
const busquedaRouter = require('./src/router/busqueda.router');
const authRouter = require('./src/router/auth.router');
const uploadRouter = require('./src/router/uploads.router');

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(express.json());

dbConection();

app.use('/api/usuarios', usuarioRouter);
app.use('/api/hospitales', hospitalesRouter);
app.use('/api/medicos', medicosRouter);
app.use('/api/todo', busquedaRouter);

app.use('/api/login', authRouter);
app.use('/api/upload', uploadRouter);

app.listen(process.env.PORT, () => {
	console.log('server in port' + process.env.PORT);
});
