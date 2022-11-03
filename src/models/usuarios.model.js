const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UsuarioSchema.method('toJSON', function () {
	const { __v, _id, password, ...obj } = this.toObject();
	obj.id = _id;
	return obj;
});

module.exports = model('Usuario', UsuarioSchema);
