import { Router } from 'express'
import { requireAdmin, requireUser } from '../middlewares/auth'
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/product.controller'

export const ProductRouter = Router()

ProductRouter.get('/', requireAdmin, getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requireUser, createProduct)
ProductRouter.patch('/:id', updateProduct)
ProductRouter.delete('/:id', deleteProduct)
