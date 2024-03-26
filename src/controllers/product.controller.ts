import { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import {
  createProductToDB,
  getProductById,
  getProductsFromDB,
  updateProductById,
  deleteProductById
} from '../services/product.service'
import { logger } from '../utils/logger'
import { v4 as uuidv4 } from 'uuid'

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      })
    }
    logger.error('Data not found')
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: 'Data not found',
      data: {}
    })
  } else {
    const products = await getProductsFromDB()
    logger.info('Success get product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error(`ERR: product - create = ${error.details[0].message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    await createProductToDB(value)
    logger.info('Succes add new product')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product success'
    })
  } catch (error) {
    logger.error('SERVER ERROR')
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)

  if (error) {
    logger.error(`ERR: product - update = ${error.details[0].message}`)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    })
  }

  try {
    await updateProductById(id, value)
    logger.info('Success update product')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Update product success'
    })
  } catch (error) {
    logger.error('SERVER ERROR')
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const product = await deleteProductById(id)
    if (product) {
      logger.info('Success delete product data')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'Delete product success'
      })
    }
    logger.error('Data not found')
    return res.status(404).send({
      status: false,
      statusCode: 404,
      message: 'Data not found',
      data: {}
    })
  } catch (error) {
    logger.error('SERVER ERROR')
    return res.status(500).send({
      status: false,
      statusCode: 500,
      message: error
    })
  }
}
