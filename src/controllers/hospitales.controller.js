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

const updateHospitales = (req, res) => {
	res.status(200).json({
		ok: true,
		msj: 'updateHospitales',
	});
};

const deleteHospitales = (req, res) => {
	res.status(200).json({
		ok: true,
		msj: 'deleteHospitales',
	});
};

module.exports = {
	getHospitales,
	createHospitales,
	updateHospitales,
	deleteHospitales,
};
