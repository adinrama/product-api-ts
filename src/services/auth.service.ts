import userModel from '../models/user.model'
import ProductType from '../types/product.type'

export const registerUserToDB = async (payload: ProductType) => {
  return await userModel.create(payload)
}

export const findUserByEmail = async (email: string) => {
  return await userModel.findOne({ email })
}
