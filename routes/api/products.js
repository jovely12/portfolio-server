const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const upload = require('../../middleware/imgUpload');
const {imgDelete} = require('../../middleware/imgDelete');

router.route('/')
	.get(productsController.getAllProducts)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), upload.single('file'), productsController.createNewProduct)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), productsController.updateProduct)
  .delete(verifyRoles(ROLES_LIST.Admin), imgDelete, productsController.deleteProduct);

router.route('/:id')
	.get(productsController.getProduct);

module.exports = router;