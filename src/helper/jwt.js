const jwt = require('jsonwebtoken');
require('dotenv').config();
const generarJWT = (id) => {
	return new Promise((resolve, reject) => {
		const payload = {
			id,
		};
		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: '12h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generarJWT,
};
