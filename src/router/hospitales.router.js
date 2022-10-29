const { Router } = require('express');
const { check } = require('express-validator');
const {
	getHospitales,
	createHospitales,
	updateHospitales,
	deleteHospitales,
} = require('../controllers/hospitales.controller');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', getHospitales);

router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	createHospitales
);

router.put(
	'/:id',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	updateHospitales
);

router.delete('/:id', validarJWT, deleteHospitales);

module.exports = router;
