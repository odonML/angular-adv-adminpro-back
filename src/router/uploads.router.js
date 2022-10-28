const { Router } = require('express');
const { uploadFile, getFile } = require('../controllers/upload.controlle');
const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validarJWT');
const router = Router();

router.use(fileUpload());

router.put('/:tipo/:id', [validarJWT], uploadFile);
router.get('/:tipo/:file', [validarJWT], getFile);

module.exports = router;
