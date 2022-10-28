const { Router } = require('express');
const {
	getBusqueda,
	gatInCollection,
} = require('../controllers/busqueda.controller');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

router.get('/:busqueda', [validarJWT], getBusqueda);
router.get('/coleccion/:tabla/:busqueda', [validarJWT], gatInCollection);

module.exports = router;
