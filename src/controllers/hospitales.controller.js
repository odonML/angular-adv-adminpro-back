const Hospital = require('../models/hospital.model');
const getHospitales = async (req, res) => {
	const hospitales = await Hospital.find().populate('usuario', 'nombre');
	res.status(200).json({
		ok: true,
		hospitales,
	});
};

const createHospitales = async (req, res) => {
	try {
		let id = req.id;
		let hospital = new Hospital({
			usuario: id,
			...req.body,
		});

		const hospitalDB = await hospital.save();

		res.status(200).json({
			ok: true,
			hospital: hospitalDB,
		});
	} catch (error) {
		console.log('createHospitales error ', error);
		res.status(500).json({
			ok: false,
			msj: 'Error inesperado createHospitales ',
		});
	}
};

const updateHospitales = async (req, res) => {
	const id = req.params.id;
	try {
		const hospitalDB = await Hospital.findById(id);
		if (!hospitalDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un hospital con ese id' });
		}

		const { usuario, ...campos } = req.body;

		const hospitalActualizado = await Hospital.findOneAndUpdate(id, campos, {
			new: true,
		});

		res.status(200).json({ ok: true, hospital: hospitalActualizado });
	} catch (error) {
		console.log('updateHospitales error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error en updateHospitales',
		});
	}
};

const deleteHospitales = async (req, res) => {
	const id = req.params.id;
	try {
		const hospitalDB = await Hospital.findById(id);
		if (!hospitalDB) {
			return res
				.status(404)
				.json({ ok: false, msj: 'No existe un hospital con ese id' });
		}

		await Hospital.findOneAndDelete(id);

		res.status(200).json({
			ok: true,
			msj: 'hospital eliminado ',
		});
	} catch (error) {
		console.log('deleteHospitales error ', error);
		res.status(500).json({
			ok: false,
			msj: 'ocurrion un error deleteHospitales',
		});
	}
};

module.exports = {
	getHospitales,
	createHospitales,
	updateHospitales,
	deleteHospitales,
};
