const { Router } = require('express');
const {
	login,
	googleSignIn,
	renewToken,
} = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

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

router.get('/renew', validarJWT, renewToken);

module.exports = router;
