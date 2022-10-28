const fs = require('fs');

const Path = require('path');

const actualizarImagen = async (tipo, infoById, nombreArchivo) => {
	// const pathViejo = ;
	const pathViejo = Path.join(__dirname, `../upload/${tipo}/${infoById.img}`);

	if (fs.existsSync(pathViejo)) {
		fs.unlinkSync(pathViejo);
	}
	infoById.img = nombreArchivo;
	await infoById.save();

	return true;
};

module.exports = {
	actualizarImagen,
};
