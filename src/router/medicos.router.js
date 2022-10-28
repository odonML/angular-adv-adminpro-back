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
		check('hospital', 'el hospital es obligatorio').isMongoId(),
		validarCampos,
	],
	createMedicos
);

router.put('/:id', [], updateMedicos);

router.delete('/:id', deleteMedicos);

module.exports = router;
