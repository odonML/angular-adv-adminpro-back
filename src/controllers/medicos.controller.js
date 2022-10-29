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

const updateMedicos = async (req, res) => {
	const id = req.params.id;
	try {
		const medicoDB = await Medico.findById(id);
		if (!medicoDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un medico con ese id' });
		}

		const { usuario, hospital, ...campos } = req.body;

		const usuarioActualizado = await Medico.findOneAndUpdate(id, campos, {
			new: true,
		});

		res.status(200).json({ ok: true, medico: usuarioActualizado });
	} catch (error) {
		console.log('updateMedicos error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error en updateMedicos',
		});
	}
};

const deleteMedicos = async (req, res) => {
	const id = req.params.id;
	try {
		const medicoDB = await Medico.findById(id);
		if (!medicoDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un medico con ese id' });
		}

		await Medico.findOneAndDelete(id);

		res.status(200).json({
			ok: true,
			msj: 'medico eliminado ',
		});
	} catch (error) {
		console.log('deleteMedicos error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error deleteMedicos',
		});
	}
};

module.exports = {
	getMedicos,
	createMedicos,
	updateMedicos,
	deleteMedicos,
};
