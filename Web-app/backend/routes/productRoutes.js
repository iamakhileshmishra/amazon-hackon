import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/new').post(protect,createProduct)
router.route('/:id/reviews').post(protect,admin, createProductReview)
router.get('/top', getTopProducts)

router
  .route('/:id')
  .get(getProductById)
  .delete(
    deleteProduct)
  .put(updateProduct)

export default router
