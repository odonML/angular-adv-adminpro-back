const { Router } = require('express');
const { check } = require('express-validator');
const {
	getMedicos,
	createMedicos,
	updateMedicos,
	deleteMedicos,
} = require('../controllers/medicos.controller');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

router.get('/', getMedicos);

router.post(
	'/',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	createMedicos
);

router.put(
	'/:id',
	[
		validarJWT,
		check('nombre', 'el nombre es obligatorio').not().isEmpty(),
		validarCampos,
	],
	updateMedicos
);

router.delete('/:id', validarJWT, deleteMedicos);

module.exports = router;
