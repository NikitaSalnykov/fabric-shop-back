const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/products')
const { validateBody, isValidId, authenticate } = require('../../middlewares')
const { schemas } = require('../../models/product')

router.get('/', ctrl.getAll)

// router.get('/', authenticate, ctrl.getAll)

router.get('/:productId', isValidId, ctrl.getById)

// router.get('/:contactId', authenticate, isValidId, ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.addProduct)

// router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addProduct)

router.delete('/:productId', isValidId, ctrl.deleteProduct)

// router.delete('/:contactId', authenticate, isValidId, ctrl.deleteProduct)

router.put('/:productId', isValidId, validateBody(schemas.addSchema), ctrl.updateProduct)

// router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateProduct)

// router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router
