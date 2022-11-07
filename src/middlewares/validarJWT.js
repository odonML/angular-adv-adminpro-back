const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.model');
require('dotenv').config();

const validarJWT = (req, res, next) => {
	const token = req.header('x-token');

	if (!token) {
		res.status(401).json({
			ok: false,
			msj: 'No hay token en la peticion',
		});
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		req.id = id;
		next();
	} catch (error) {
		res.status(401).json({
			ok: false,
			msj: 'token no valido',
		});
	}
};

const validarAdmin = async (req, res, next) => {
	let id = req.id;

	try {
		let usuario = await Usuario.findById(id);

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msj: 'no existe un usuario con ese id',
			});
		}

		if (usuario.role !== 'ADMIN_ROLE') {
			return res.status(403).json({
				ok: false,
				msj: 'no permisos este usuario',
			});
		}

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrio un error en la validacion de admin',
		});
	}
};

const validarAdminMismoId = async (req, res, next) => {
	let id = req.id;
	let paramId = req.params.id;

	try {
		let usuario = await Usuario.findById(id);

		if (!usuario) {
			return res.status(404).json({
				ok: false,
				msj: 'no existe un usuario con ese id',
			});
		}

		if (usuario.role === 'ADMIN_ROLE' || id === paramId) {
			next();
		} else {
			return res.status(403).json({
				ok: false,
				msj: 'no permisos este usuario',
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrio un error en la validacion de admin',
		});
	}
};

module.exports = {
	validarJWT,
	validarAdmin,
	validarAdminMismoId,
};
