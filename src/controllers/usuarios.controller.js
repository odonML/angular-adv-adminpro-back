const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const getUsuarios = async (req, res) => {
	const desde = Number(req.query.desde) || 0;

	// let usuarios = await Usuario.find({}).skip(desde).limit(5);
	// let total = await Usuario.count();

	const [usuarios, total] = await Promise.all([
		Usuario.find({}).skip(desde).limit(5),
		Usuario.count(),
	]);
	res.status(200).json({
		ok: true,
		usuarios,
		total,
	});
};

const createUsuario = async (req, res) => {
	let { email, password } = req.body;

	try {
		let existUsuario = await Usuario.findOne({ email });
		if (existUsuario) {
			return res
				.status(400)
				.json({ ok: false, msj: 'ya existe un usuario con ese correo' });
		}

		let usuario = new Usuario(req.body);

		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		//Token
		const token = await generarJWT(usuario.id);

		res.status(200).json({
			ok: true,
			usuario,
			token,
		});
	} catch (error) {
		console.log('createUsuario error', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error en createUsuario',
		});
	}
};

const updateUsuario = async (req, res) => {
	const id = req.params.id;
	try {
		const usuarioDB = await Usuario.findById(id);
		if (!usuarioDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un usuario conese id' });
		}

		const { email, password, google, ...campos } = req.body;

		if (usuarioDB.email !== email) {
			let existUsuario = await Usuario.findOne({ email });
			if (existUsuario) {
				return res
					.status(400)
					.json({ ok: false, msj: 'ya existe un usuario con ese correo' });
			}
		}

		campos.email = email;

		const usuarioActualizado = await Usuario.findOneAndUpdate(
			{ _id: id },
			campos,
			{
				new: true,
			}
		);

		// await Usuario.updateOne({ _id: id }, campos);

		res.status(200).json({ ok: true, usuario: usuarioActualizado });
	} catch (error) {
		console.log('updateUsuario error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error en updateUsuario',
		});
	}
};

const deleteUsuario = async (req, res) => {
	const id = req.params.id;
	try {
		const usuarioDB = await Usuario.findById(id);
		if (!usuarioDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un usuario conese id' });
		}

		await Usuario.findOneAndDelete({ _id: id });

		res.status(200).json({
			ok: true,
			msj: 'usuario eliminado ',
		});
	} catch (error) {
		console.log('deleteUsuario error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error deleteUsuario',
		});
	}
};

module.exports = {
	getUsuarios,
	createUsuario,
	updateUsuario,
	deleteUsuario,
};
