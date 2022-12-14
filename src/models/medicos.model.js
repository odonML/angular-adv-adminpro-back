const { Schema, model } = require('mongoose');

const MedicoSchema = Schema(
	{
		nombre: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		usuario: {
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
			required: true,
		},
		hospital: {
			type: Schema.Types.ObjectId,
			ref: 'Hospital',
		},
	},
	{ collection: 'medicos' }
);

MedicoSchema.method('toJSON', function () {
	const { __v, _id, ...obj } = this.toObject();
	obj.id = _id;
	return obj;
});

module.exports = model('Medico', MedicoSchema);
