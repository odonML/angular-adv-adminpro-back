const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');
const { googleVerify } = require('../helper/google-verify');

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

const googleSignIn = async (req, res) => {
	try {
		const { email, picture, name } = await googleVerify(req.body.token);

		const usuarioDB = await Usuario.findOne({ email });
		let user;
		if (usuarioDB) {
			user = usuarioDB;
			user.google = true;
		} else {
			user = new Usuario({
				nombre: name,
				email,
				password: '###',
				img: picture,
				google: true,
			});
		}

		await user.save();

		const token = await generarJWT(user.id);

		res.status(200).json({
			ok: true,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: true,
			msj: 'ocurrio un error en la validacion del token',
		});
	}
};

const renewToken = async (req, res) => {
	const id = req.id;

	const token = await generarJWT(id);

	const data = await Usuario.findById(id);

	res.status(200).json({
		ok: true,
		token,
		data,
	});
};

module.exports = {
	login,
	googleSignIn,
	renewToken,
};
