const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post(
	'/',
	[
		check('email', 'el email es obligatorio').isEmail(),
		check('password', 'el password es obligatorio').not().isEmpty(),
		validarCampos,
	],
	login
);

router.post(
	'/google',
	[check('token', 'el token es obligatorio').not().isEmpty(), validarCampos],
	googleSignIn
);

module.exports = router;
