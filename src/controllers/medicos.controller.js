const Medico = require('../models/medicos.model');

const getMedicos = async (req, res) => {
	const medicos = await Medico.find()
		.populate('usuario', 'nombre')
		.populate('hospital', 'nombre');
	res.status(200).json({
		ok: true,
		medicos,
	});
};

const createMedicos = async (req, res) => {
	try {
		let id = req.id;
		let medico = new Medico({
			usuario: id,
			...req.body,
		});

		const medicoDB = await medico.save();

		res.status(200).json({
			ok: true,
			medico: medicoDB,
		});
	} catch (error) {
		console.log('createMedicos error ', error);
		res.status(500).json({
			ok: false,
			msj: 'Error inesperado createMedicos ',
		});
	}
};

const updateMedicos = (req, res) => {
	res.status(200).json({
		ok: true,
		msj: 'updateMedicos',
	});
};

const deleteMedicos = (req, res) => {
	res.status(200).json({
		ok: true,
		msj: 'deleteMedicos',
	});
};

module.exports = {
	getMedicos,
	createMedicos,
	updateMedicos,
	deleteMedicos,
};
