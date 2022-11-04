const Usuario = require('../models/usuarios.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medicos.model');

const getBusqueda = async (req, res) => {
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, 'i');

	// const usuarios = await Usuario.find({ nombre: regex });
	// const hospitales = await Hospital.find({ nombre: regex });
	// const medicos = await Medico.find({ nombre: regex });

	const [usuarios, hospitales, medicos] = await Promise.all([
		Usuario.find({ nombre: regex }),
		Hospital.find({ nombre: regex }),
		Medico.find({ nombre: regex }),
	]);

	res.status(200).json({
		ok: true,
		usuarios,
		hospitales,
		medicos,
	});
};

const gatInCollection = async (req, res) => {
	const tabla = req.params.tabla;
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, 'i');

	const tablas = {
		medicos: Medico,
		hospitales: Hospital,
		usuarios: Usuario,
	};

	let collection = tablas[tabla];

	if (!collection) {
		return res.status(400).json({
			ok: true,
			msj: 'tabla no existe',
		});
	}

	let resultado = await collection.find({ nombre: regex });

	if (resultado.length === 0) {
		return res.status(404).json({
			ok: false,
			resultado,
			msj: 'No existe esa busqueda',
		});
	}

	res.status(200).json({
		ok: true,
		resultado,
	});
};

module.exports = {
	getBusqueda,
	gatInCollection,
};
