const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const login = async (req, res) => {
	let { email, password } = req.body;

	try {
		const usuarioDB = await Usuario.findOne({ email });
		if (!usuarioDB) {
			return res.status(404).json({ ok: false, msj: 'no existe usuario' });
		}

		const validPassword = bcrypt.compareSync(password, usuarioDB.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msj: 'password no valido',
			});
		}

		//Token
		const token = await generarJWT(usuarioDB.id);

		res.status(200).json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log('login error', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrio un error en login',
		});
	}
};

module.exports = {
	login,
};
