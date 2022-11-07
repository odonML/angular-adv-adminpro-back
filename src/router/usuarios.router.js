const { Router } = require('express');
const { check } = require('express-validator');
const {
	getUsuarios,
	createUsuario,
	updateUsuario,
	deleteUsuario,
} = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const {
	validarJWT,
	validarAdmin,
	validarAdminMismoId,
} = require('../middlewares/validarJWT');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post(
	'/',
	[
		check('nombre', 'nombre es obligatorio').not().isEmpty(),
		check('password', 'password es obligatorio').not().isEmpty(),
		check('email', 'email es obligatorio').isEmail(),
		validarCampos,
	],
	createUsuario
);

router.put(
	'/:id',
	[
		validarJWT,
		validarAdminMismoId,
		check('nombre', 'nombre es obligatorio').not().isEmpty(),
		check('role', 'role es obligatorio').not().isEmpty(),
		check('email', 'email es obligatorio').isEmail(),
		validarCampos,
	],
	updateUsuario
);

router.delete('/:id', [validarJWT, validarAdmin], deleteUsuario);

module.exports = router;
