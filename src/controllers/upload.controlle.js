const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helper/actualizar-imagen');
const Usuario = require('../models/usuarios.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medicos.model');

const Path = require('path');
const fs = require('fs');

const uploadFile = async (req, res) => {
	const tipo = req.params.tipo;
	const id = req.params.id;

	const tipos = ['hospitales', 'usuarios', 'medicos'];
	if (!tipos.includes(tipo)) {
		return res.status(400).json({
			ok: false,
			msj: 'no existe ese tipo',
		});
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({
			ok: false,
			msj: 'no existe archivo',
		});
	}

	const file = req.files.imagen;
	const extencion = file.name.split('.').pop();
	const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

	if (!extencionesValidas.includes(extencion)) {
		return res.status(400).json({
			ok: false,
			msj: 'archivo con extencion no valida',
		});
	}

	const nombreArchivo = `${uuidv4()}.${extencion}`;

	const path = `src/upload/${tipo}/${nombreArchivo}`;

	const tablas = {
		medicos: Medico,
		hospitales: Hospital,
		usuarios: Usuario,
	};

	let collection = tablas[tipo];
	let infoById = await collection.findById(id);

	if (!infoById) {
		console.log('no existe informacion con ese id');
		return res
			.status(404)
			.json({ ok: false, msj: 'No existe un usuario conese id' });
	}

	// Use the mv() method to place the file somewhere on your server
	file.mv(path, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).json({
				ok: false,
				msj: 'error al guardar archivo',
			});
		}

		actualizarImagen(tipo, infoById, nombreArchivo);

		res.status(200).json({
			ok: true,
			msj: 'archivo subido con exito',
			nombreArchivo,
		});
	});
};

const getFile = (req, res) => {
	const tipo = req.params.tipo;
	const file = req.params.file;

	const pathImg = Path.join(__dirname, `../upload/${tipo}/${file}`);
	console.log(tipo);
	console.log(file);

	console.log(fs.existsSync(pathImg));
	if (fs.existsSync(pathImg)) {
		res.sendFile(pathImg);
	} else {
		const pathImgDefault = Path.join(__dirname, `../upload/not-found.jpg`);
		res.sendFile(pathImgDefault);
	}
};
module.exports = {
	uploadFile,
	getFile,
};
